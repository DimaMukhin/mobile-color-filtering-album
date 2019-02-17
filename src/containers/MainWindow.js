import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import images from '../data/images';
import Album from '../components/Album';
import AlbumHeader from '../components/AlbumHeader';

export default class MainWindow extends Component {
    state = {
        filteredImages: images
    }

    // filter on blue color
    onClickHandler = (color) => {
        const newFilteredImages = typeof color === 'string' 
            ? images.filter((image) => image.dominantColors.includes(color))
            : images;
        this.setState({
            filteredImages: newFilteredImages
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AlbumHeader onClick={this.onClickHandler} />
                <ScrollView style={{ flex: 1 }}>
                    <Album images={this.state.filteredImages} />
                </ScrollView>
            </View>
        );
    }
}
