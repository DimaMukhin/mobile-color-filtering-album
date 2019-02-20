import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import images from '../data/images';
import Album from '../components/Album';
import AlbumHeader from '../components/AlbumHeader';

export default class ImageGallery extends Component {
    state = {
        filteredImages: images
    };

    /**
     * on Header (color) button click handler
     * filter images based on the clicked color
     */
    onHeaderButtonClickHandler = (color) => {
        const newFilteredImages = typeof color === 'string'
            ? images.filter((image) => image.dominantColors.includes(color))
            : images;
        this.setState({
            filteredImages: newFilteredImages
        });
    };

    onImageClickHandler = (image, endTime) => {
        const startTime = this.props.navigation.getParam('startTime');
        const results = this.props.navigation.getParam('results');
        const timeTaken = endTime - startTime;

        //Send results with the new attempt
        this.props.navigation.navigate('MainWindow', { results: [...results, timeTaken] });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AlbumHeader onClick={this.onHeaderButtonClickHandler} />
                <ScrollView style={{ flex: 1 }}>
                    <Album images={this.state.filteredImages} onClick={this.onImageClickHandler} />
                </ScrollView>
            </View>
        );
    }
}
