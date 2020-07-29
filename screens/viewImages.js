import React, {Component} from 'react';
import {Alert, View, Image, StyleSheet, StatusBar, ToastAndroid} from 'react-native';
import ViewPager from '@react-native-community/viewpager'
import {ToolbarComponent} from '../components/toolbar';
import {connect} from 'react-redux';
import { copyFile, mkdir, ExternalStorageDirectoryPath, writeFile, unlink} from 'react-native-fs';
import Share from 'react-native-share';
import {selectedImage, getImages} from '../redux/selector';
import {delImage, setSelectedImage} from '../redux/actions';


class PhotoSlider extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
           title: 'Slider',
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
        
        //this.props.setSelectedImage(this.props.images[this.state.id]);
    }

    state = {
        id: this.props.navigation.getParam('index'),
    }

    save = _ => {
        try{
            let saveUrl = `${ExternalStorageDirectoryPath}/Status Saver`
            mkdir(saveUrl)
            .then(res => {
                writeFile(`${saveUrl}/${this.props.image.name}`,'','base64').catch((err) => Alert.alert(err.message));
                copyFile(this.props.image.path, `${saveUrl}/${this.props.image.name}`).catch((err) => {
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
            await Share.open({url: `file://${this.props.image.path}`, 
                title: 'Share file', 
                failOnCancel: false,
                type: 'image/*'
            });
        }catch(err){
            Alert.alert(err);
        }
        
    }

    delete = _ =>{
        try{
            unlink(`file://${this.props.image.path}`).then(_ =>{
                this.props.delImage(this.state.id);
                ToastAndroid.show("Deleted", ToastAndroid.SHORT);
                this.setState({id: this.state.id - 1});
            })
        }catch(err){
            Alert.alert(err.message);
        }
    }


    render(){
        let {id} = this.state;
        this.props.setSelectedImage(this.props.images[this.state.id])
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='#26B469' />
                {/*<Image style={styles.largeView} 
                    source={{uri: `file:///${this.props.images[id].path}`}} />*/}
                <ViewPager
                    initialPage={id}
                    style={{width: '100%', height: '100%'}}
                    onPageSelected={e => this.setState({id: e.nativeEvent.position})}
                >
                    {
                        this.props.images.map((image, key) => (
                            <View style={styles.pageStyle} key={key}>
                                <Image style={styles.largeView} 
                                    source={{uri: `file:///${image.path}`}} 
                                />
                            </View>
                        ))
                    }
                </ViewPager>
            </View>
        );
    }
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
    pageStyle: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
})


const mapStateToProps = state => {
    return {image: selectedImage(state), images: getImages(state)};
}

export default connect(mapStateToProps,{delImage, setSelectedImage})(PhotoSlider);