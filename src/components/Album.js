import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

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

    render() {
        const albumItems = this.state.images.map((image, i) => (
            <TouchableOpacity key={ i } onPress={ () => this.props.onClick(image) }>
                <AlbumItem url={image.url} />
            </TouchableOpacity>
        ));

        return (
            <View style={styles.container}>
                { albumItems }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        padding: 10
    }
});
