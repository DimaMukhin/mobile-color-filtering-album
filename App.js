import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainWindow from './src/containers/MainWindow';

export default class App extends React.Component {
  render() {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBar}></View>
            <MainWindow />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    topBar: {
        height: 23,
        backgroundColor: 'grey'
    }
});
