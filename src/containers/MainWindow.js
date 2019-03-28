import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Results from '../components/Results';
import images from '../data/images';
import shuffle from 'shuffle-array';

export default class MainWindow extends Component {
    MAX_TRIALS = 2;
    COLOR_LEVELS = ['Scrolling', '1 Color filter', '2 Color filters'];
    IMG_LEVELS = [10, 20, 40];

    constructor(props) {
        super(props);
        this.state = {
            trial: 0,
            image: this.getRandomImage(),
            results: [],
            colorLevel: 0,
            maxTrials: this.MAX_TRIALS,
            totalColorLevels: this.COLOR_LEVELS.length,
            imageLevel: 0,
            totalImageLevels: this.IMG_LEVELS.length
        };

        this.onStartButtonClickHandler = this.onStartButtonClickHandler.bind(this);
        this.onRestartButtonClickHandler = this.onRestartButtonClickHandler.bind(this);
    }

    getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newResults = nextProps.navigation.getParam('results');

        if (newResults && newResults.length === 0) {
            return { results: newResults, colorLevel: 0, imageLevel: 0 };
        }

        let newColorLevel = prevState.colorLevel;
        let newImgLevel = prevState.imageLevel;

        if (newResults && newResults.length > 0 && (newResults.length % prevState.maxTrials === 0)) {
            newImgLevel = (newImgLevel + 1) % (prevState.totalImageLevels + 1);
        }

        if (newResults && newResults.length > 0 && (newResults.length % (prevState.totalImageLevels * prevState.maxTrials) === 0)) {
            newColorLevel = (newColorLevel + 1) % (prevState.totalColorLevels + 1);
            newImgLevel = 0;
        }

        if (newResults && (newResults.length !== prevState.results.length)) {

            return { results: newResults, colorLevel: newColorLevel, imageLevel: newImgLevel };
        }

        return null;
    }

    onStartButtonClickHandler() {
        const currImages = this.getPossibleImages();

        const image = this.getRandomImage();
        const startTime = new Date().getTime();

        this.props.navigation.navigate('ImageGallery', { startTime, results: this.state.results, imageToFind: this.state.image, currImages });
        this.setState({ image });
    }

    onRestartButtonClickHandler() {
        this.props.navigation.navigate('MainWindow', { results: [] });
    }

    getPossibleImages() {
        const imgIndex = images.findIndex(curr => curr.id === this.state.image.id);
        let possibleImages = [...images];
        possibleImages.splice(imgIndex, 1);

        possibleImages = shuffle.pick(possibleImages, { 'picks': (this.IMG_LEVELS[this.state.imageLevel] - 1) });
        possibleImages.push(images[imgIndex]);

        return possibleImages;
    }

    render() {
        //When done will all the trials display the results
        if (this.state.results.length === this.MAX_TRIALS * this.COLOR_LEVELS.length * this.IMG_LEVELS.length) {
            return <Results results={this.state.results} onClick={this.onRestartButtonClickHandler} />;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Find this Picture</Text>
                <Image
                    style={styles.imageDimensions}
                    source={{ uri: this.state.image.url }}
                />
                <Text>Image ID: {this.state.image.id}</Text>
                {this.state.colorLevel === 0 && <Text style={styles.colorLevel}>Using <Text style={{ fontWeight: 'bold', color: 'red' }}>No</Text> color filters</Text>}
                {this.state.colorLevel === 1 && <Text style={styles.colorLevel}>Using <Text style={{ fontWeight: 'bold', color: 'red' }}>1</Text> color filter</Text>}
                {this.state.colorLevel === 2 && <Text style={styles.colorLevel}>Using <Text style={{ fontWeight: 'bold', color: 'red' }}>2</Text> color filters</Text>}

                <View style={styles.startButton}>
                    <Button
                        onPress={this.onStartButtonClickHandler}
                        title="Start"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    startButton: {
        width: '80%',
        height: 50,
        marginTop: 20
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 50
    },
    colorLevel: {
        fontSize: 30,
        color: 'blue'
    },
    imageDimensions: {
        width: 350,
        height: 350,
        resizeMode: 'stretch'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        alignItems: 'center'
    }
});
