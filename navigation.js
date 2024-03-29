import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PhotoScreen from './screens/photos';
import PhotoSlider from './screens/viewImages';
import VideoScreen from './screens/videos';
import Player from './screens/videoPlayer';
import SplashScreen from './screens/splash';


const Photo = createStackNavigator({
    Photos: PhotoScreen,
    Slider: PhotoSlider,
},{
    initialRouteName: 'Photos',
});

const Video = createStackNavigator({
    Videos: VideoScreen,
    Player,
},{
    initialRouteName: 'Videos',
});


const AppNavigator = createBottomTabNavigator({
    Photo: Photo,
    Video: Video,
},{
    initialRouteName: 'Photo',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent;
          let iconName;
          if (routeName === 'Photo') {
            IconComponent = Ionicons;
            iconName = `md-photos`;
            // Sometimes we want to add badges to some icons. 
            // You can check the implementation below.
            //IconComponent = HomeIconWithBadge; 
          } else if (routeName === 'Video') {
            IconComponent = Entypo;
            iconName = `folder-video`;
          }
    
          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: '#26B469',
        inactiveTintColor: 'gray',
      },
});

export default createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator,
},{
  initialRouteName: 'Splash'
});