import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

/* Collapsible header Support for Expo */
import { setExpoStatusBarHeight } from 'react-navigation-collapsible';
import { Constants } from 'expo';
setExpoStatusBarHeight(Constants.statusBarHeight);

import MainWindow from './src/containers/MainWindow';
import ImageGallery from './src/containers/ImageGallery';

const AppNavigator = createStackNavigator({
    MainWindow: {
        screen: MainWindow,
        navigationOptions: {
            header: null
        }
    },
    ImageGallery: {
        screen: ImageGallery,
        navigationOptions: {
            header: null
        }
    },

});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}