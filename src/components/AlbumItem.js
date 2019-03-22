import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default (props) => (
    <View style={styles.container} >
        <Image source={{uri: props.url}} style={styles.imageInBox} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        backgroundColor: 'red',
        marginTop: 10
    },
    imageInBox: {
        width: 150,
        height: 150
    }
});
