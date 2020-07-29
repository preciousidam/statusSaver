import React, { Component } from 'react';
import { Alert, View, TouchableHighlight, FlatList, Image, StyleSheet, StatusBar } from 'react-native';
import { ExternalStorageDirectoryPath, readDir} from 'react-native-fs';
import {connect} from 'react-redux';
import {updateImages, setSelectedImage} from '../redux/actions';
import {getImages} from '../redux/selector';



class PhotoScreen extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Pictures',
            headerStyle: {
                backgroundColor: '#26B469'
            },
            headerTintColor: '#fff',
        };
    };

    _bootstrap = _ => {
        let images = [];
        readDir(`${ExternalStorageDirectoryPath}/WhatsApp/Media/.Statuses/`)
        .then(files => {
            files.forEach(file => {
                if(file.path.split('.').pop() === 'jpg')
                    images.push(file);
            });
        })
        .then(_ => {
            this.props.updateImages(images);
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
        //this.setState({selected: this.state.images[index], visible: true})
        //this.props.setSelectedImage(item);
        let index = this.props.images.findIndex(image => image.name === item.name);
        //Alert.alert(index);
        this.props.navigation.navigate('Slider',{index});
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
                {<FlatList
                    numColumns={3}
                    data={this.props.images}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item,index) => index.toString()}
                    style={{flex: 1}}
                    onRefresh={_ => this._onRefresh()}
                    refreshing={this.state.refreshing}
                />}

                {/*<Text onPress={_ =>this.onItemSelected(1)}>ok</Text>*/}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {images: getImages(state)};
}

export default connect(mapStateToProps,{updateImages, setSelectedImage})(PhotoScreen)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    largeView: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center', 
        alignItems: 'center'
    },
})