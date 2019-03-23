import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import AlbumItem from './AlbumItem';

export default class Album extends Component {
    state = {
        images: this.props.images
    };

    constructor(props) {
        super(props);
    }

    /**
     * Handles updating images shown after filtering in MainWindow.js
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images
        });
    }

    onAlbumItemPress = (image) => {
        const endTime = new Date();
        this.props.onClick(image, endTime.getTime());
    }

    render() {
        const albumItems = this.state.images.map((image, i) => (
            <AlbumItem url={image.url} key={i} onPress={() => this.onAlbumItemPress(image)} />
        ));

        return (
            <View style={styles.container}>
                {albumItems}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    }
});
