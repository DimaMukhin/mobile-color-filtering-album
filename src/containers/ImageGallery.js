import React, { Component } from 'react';
import { ScrollView, View, Animated } from 'react-native';
import { withCollapsible } from 'react-navigation-collapsible';
import { connect } from 'react-redux';
import { Audio } from 'expo';

import shuffle from 'shuffle-array';
import images from '../data/images';
import Album from '../components/Album';
import AlbumHeader from '../components/AlbumHeader';
import { setFirstColorFilter, setSecondColorFilter } from '../actions/colorFilterActions';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class ImageGallery extends Component {
    constructor(props) {
        super(props);
        const allImages = shuffle(this.props.navigation.getParam('currImages'));
        this.state = {
            allImages,
            filteredImages: allImages
        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ filteredImages: nextProps.navigation.getParam('currImages') });
        if (this.props.firstColorFilter != nextProps.firstColorFilter) {
            this.filterImagesByColor(nextProps.firstColorFilter, this.props.secondColorFilter);
        }

        if (this.props.secondColorFilter != nextProps.secondColorFilter) {
            this.filterImagesByColor(this.props.firstColorFilter, nextProps.secondColorFilter);
        }
    }

    /**
     * on Header (color) button click handler
     * filter images based on the clicked color
     */
    filterImagesByColor = (color1, color2) => {
        let newFilteredImages = typeof color1 === 'string'
            ? this.state.allImages.filter((image) => image.dominantColors.includes(color1))
            : this.state.allImages;

        newFilteredImages = typeof color2 === 'string'
            ? newFilteredImages.filter((image) => image.dominantColors.includes(color2))
            : newFilteredImages;

        this.setState({
            filteredImages: newFilteredImages
        });
    };

    onImageClickHandler = async (imageClicked, endTime) => {
        const startTime = this.props.navigation.getParam('startTime');
        const results = this.props.navigation.getParam('results');
        const imageToFind = this.props.navigation.getParam('imageToFind');

        //Reset the filters
        this.props.setFirstColorFilter(null);
        this.props.setSecondColorFilter(null);

        try {
            if (imageClicked.id === imageToFind.id) {
                const { sound: soundObject, status } = await Audio.Sound.createAsync(
                    require('../assets/sounds/boop.mp3'),
                    { shouldPlay: true }
                );

                const timeTaken = endTime - startTime;

                // Send results with the new attempt
                this.props.navigation.navigate('MainWindow', { results: [...results, timeTaken] });
            } else {
                const { sound: soundObject, status } = await Audio.Sound.createAsync(
                    require('../assets/sounds/error.mp3'),
                    { shouldPlay: true }
                );

                this.props.navigation.navigate('MainWindow', { results });
            }
        } catch (error) {
            console.log(error);
        }
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
    firstColorFilter: state.colorFilter.firstColorFilter,
    secondColorFilter: state.colorFilter.secondColorFilter
});

export default connect(
    mapStateToProps,
    { setFirstColorFilter, setSecondColorFilter }
)(withCollapsible(ImageGallery, collapsibleParams));
