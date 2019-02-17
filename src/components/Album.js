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

    render() {
        const albumItems = this.state.images.map((image, i) => <AlbumItem url={image.url} key={ i } />);

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
