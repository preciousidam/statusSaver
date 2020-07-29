import React, {Component} from 'react';
import {Alert, View, StyleSheet, ToastAndroid, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {ToolbarComponent} from '../components/toolbar';
import {Video} from 'expo-av';
import { copyFile, mkdir, ExternalStorageDirectoryPath, writeFile, unlink} from 'react-native-fs';
import {selectedVideo, getVideos} from '../redux/selector';
import {delVideo} from '../redux/actions';
import Share from 'react-native-share';


class Player extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
           title: 'Player',
            headerRight: () => (<ToolbarComponent 
                                    save={navigation.getParam('save')}
                                    share={navigation.getParam('share')}
                                    delete={navigation.getParam('delete')}
                                />),
            headerStyle: {
                backgroundColor: '#26B469'
            },
            headerTintColor: '#fff',
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({save: this.save, share: this.share, delete: this.delete});
    }

    save = _ => {
        try{
            let saveUrl = `${ExternalStorageDirectoryPath}/Status Saver`
            mkdir(saveUrl)
            .then(res => {
                writeFile(`${saveUrl}/${this.props.video.name}`,'','base64').catch((err) => Alert.alert(err.message));
                copyFile(this.props.video.path, `${saveUrl}/${this.props.video.name}`).catch((err) => {
                    Alert.alert(err.message);
                });
            }).then(_ => {
                ToastAndroid.show('Saved', ToastAndroid.SHORT);
            }).catch(err => Alert.alert(err.message));
        }catch(err){
            Alert.alert(err);
        }
    }

    share = async _ => {
        try{
            await Share.open({url: `file:///${this.props.video.path}`, 
                title: 'Share file', 
                failOnCancel: false,
                type: 'video/*'
            });
        }catch(err){
            Alert.alert(err);
        }
        
    }

    delete = _ =>{
        try{
            unlink(`file://${this.props.video.path}`).then(_ =>{
                ToastAndroid.show("Deleted", ToastAndroid.SHORT);
                this.props.delVideo(this.props.navigation.getParam('index'));
                this.props.navigation.goBack();
            })
        }catch(err){
            Alert.alert(err.message);
        }
    }

    render(){
        return (
        <View style={{flex: 1, width: '100%', height: '100%'}}>
            <StatusBar barStyle='light-content' backgroundColor='#26B469' />
            <Video
                source={{ uri:  `file:///${this.props.video.path}`}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={{ width: '100%', height: '100%', flex: 1 }}
                useNativeControls={true}
            />
        </View>);
    }
    
}

const mapStateToProps = state => {
    return {video: selectedVideo(state)};
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeView: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        justifyContent: 'center', 
        alignItems: 'center',
    },
})

export default connect(mapStateToProps,{delVideo})(Player);