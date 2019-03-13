import React, { Component } from 'react';
import { ScrollView, View, Animated } from 'react-native';
import { withCollapsible } from 'react-navigation-collapsible';
import { connect } from 'react-redux';

import images from '../data/images';
import Album from '../components/Album';
import AlbumHeader from '../components/AlbumHeader';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class ImageGallery extends Component {
    state = {
        filteredImages: images
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.firstColorFilter != nextProps.firstColorFilter) {
            this.filterImagesByColor(nextProps.firstColorFilter);
        }
    }

    /**
     * on Header (color) button click handler
     * filter images based on the clicked color
     */
    filterImagesByColor = (color) => {
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

const mapStateToProps = state => ({
    firstColorFilter: state.colorFilter.firstColorFilter
});

export default connect(
    mapStateToProps,
    null
)(withCollapsible(ImageGallery, collapsibleParams));
