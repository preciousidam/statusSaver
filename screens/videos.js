import React, { Component } from 'react';
import { Alert, View, TouchableHighlight, FlatList, Image, StyleSheet, StatusBar} from 'react-native';
import { ExternalStorageDirectoryPath, readDir } from 'react-native-fs';
import {connect} from 'react-redux';
import {getVideos} from '../redux/selector';
import {updateVideos, setSelectedVideo} from '../redux/actions';

class VideoScreen extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Videos',
            headerStyle: {
                backgroundColor: '#26B469'
            },
            headerTintColor: '#fff',
        };
    };

    _bootstrap = _ => {
        let videos = [];
        readDir(`${ExternalStorageDirectoryPath}/WhatsApp/Media/.Statuses/`)
        .then(files => {
            files.forEach(file => {
                if(file.path.split('.').pop() === 'mp4')
                    videos.push(file);
            });
        })
        .then(_ => {
            this.props.updateVideos(videos);
            this.setState({refreshing: false})
        })
        .catch(err => {
            Alert.alert(err.message)
        });
    }

    componentDidMount(){
        this._bootstrap();
    }

    state = {
        refreshing: false,
    }

    _onRefresh = _ => {
        this.setState({refreshing: true}, this._bootstrap());
    }

    onItemSelected = item =>{
        //this.setState({selected: this.state.videos[index], visible: true})
        this.props.setSelectedVideo(item);
        let index = this.props.videos.findIndex(video => video.name === item.name);
        //Alert.alert(index);
        this.props.navigation.navigate('Player',{index});
    }

    renderItem(item) {
        return (  
            <TouchableHighlight  
                style={{flex:1/3, //here you can use flex:1 also
                aspectRatio:1, opacity: 1}}
                onPress={_ => this.onItemSelected(item)}
                >
                <Image style={{flex: 1}} resizeMode='cover' 
                    source={{ uri:  `file:///${item.path}` } }></Image>
            </TouchableHighlight>
        )
    }


    render() {
        return(
            <View style={styles.container}>     
                <StatusBar barStyle='light-content' backgroundColor='#26B469' />  
                <FlatList
                    numColumns={3}
                    data={this.props.videos}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item,index) => index.toString()}
                    style={{flex: 1}}
                    onRefresh={_ => this._onRefresh()}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {videos: getVideos(state)};
}

export default connect(mapStateToProps,{updateVideos, setSelectedVideo})(VideoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
})