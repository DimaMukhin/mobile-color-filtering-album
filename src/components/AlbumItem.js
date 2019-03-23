import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default (props) => (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Image source={{ uri: props.url }} style={styles.imageInBox} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '50%',
        backgroundColor: 'red',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#666666',
    },
    imageInBox: {
        width: '100%',
        height: 200,
        resizeMode: 'stretch'
    }
});
