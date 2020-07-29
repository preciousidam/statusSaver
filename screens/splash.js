import React, {Component} from 'react';
import {Alert, Image, StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';


class SplashScreen extends Component{

    componentDidMount(){
        this.requestPermission();
    }

    requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
              title: 'Status download permission',
              message:
                'Status download needs permission to access your whatsapp status ' +
                'so as to save them on your phone.',
              buttonNegative: 'Cancel',
              buttonPositive: 'Grant',
            },
          );
          if (granted['android.permission.READ_EXTERNAL_STORAGE'] && granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
            this.props.navigation.navigate('App');
          } else {
            Alert.alert('Status Saver cannot access your WhatsApp status, to view' + 
                'save status go to Settings > apps > status saver > permissions > storage'
            );
          }
        } catch (err) {
          Alert.alert(err);
          return false;
        }
    }

    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <Image source={require('../assets/images/new-icon.png')} style={styles.image} />
                    <Text style={styles.text}>Status Downloader</Text>
                </View>
            </View>
        );
    }
}

export default connect(null,null)(SplashScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#26B469', 
        flex: 1, 
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    centered: {
        height: 100,
        position: 'relative',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
    }
})