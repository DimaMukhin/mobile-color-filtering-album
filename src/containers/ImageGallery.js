import React, { Component } from 'react';
import { ScrollView, View, Animated } from 'react-native';
import { withCollapsible } from 'react-navigation-collapsible';

import images from '../data/images';
import Album from '../components/Album';
import AlbumHeader from '../components/AlbumHeader';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class ImageGallery extends Component {
    state = {
        filteredImages: images
    };

    collapsibleParams = {
        collapsibleComponent: () => (<AlbumHeader onClick={this.onHeaderButtonClickHandler}/>),
        collapsibleBackgroundStyle: {
            height: 60,
            backgroundColor: 'white',
            // disableFadeoutInnerComponent: true,
        }
    }

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
        const { paddingHeight, animatedY, onScroll } = this.props.collapsible;

        return (
            <View style={{ flex: 1 }}>
                <AnimatedScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingTop: paddingHeight }}
                    scrollIndicatorInsets={{ top: paddingHeight }}
                    onScroll={onScroll}
                    _mustAddThis={animatedY}>
                    <Album images={this.state.filteredImages} onClick={this.onImageClickHandler} />
                </AnimatedScrollView>
            </View>
        );
    }
}

const collapsibleParams = {
    collapsibleComponent: AlbumHeader,
    collapsibleBackgroundStyle: {
        height: 145,
        backgroundColor: 'rgba(53, 53, 53, 0.8)',
        // disableFadeoutInnerComponent: true,
    }
}

export default withCollapsible(ImageGallery, collapsibleParams);
