import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider as ReduxProvider } from 'react-redux';

/* Collapsible header Support for Expo */
import { setExpoStatusBarHeight } from 'react-navigation-collapsible';
import { Constants } from 'expo';
setExpoStatusBarHeight(Constants.statusBarHeight);

import configureStore from './store';
import MainWindow from './src/containers/MainWindow';
import ImageGallery from './src/containers/ImageGallery';

const AppNavigator = createStackNavigator({
    // MainWindow: {
    //     screen: MainWindow,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    ImageGallery: {
        screen: ImageGallery,
        navigationOptions: {
            header: null
        }
    },

});

const AppContainer = createAppContainer(AppNavigator);

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <AppContainer />
            </ReduxProvider>
        );
    }
}