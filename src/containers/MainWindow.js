import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Results from '../components/Results';
import images from '../data/images';
import shuffle from 'shuffle-array';

export default class MainWindow extends Component {
    MAX_TRIALS = 3;
    COLOR_LEVELS = ['Scrolling', '1 Color filter', '2 Color filters'];
    IMG_LEVELS = [200, 400, 600];

    constructor(props) {
        super(props);
        this.state = {
            trial: 0,
            image: this.getRandomImage(),
            allResults: {},
            results: [],
            colorLevel: 0,
            imageLevel: 0
        };

        this.onStartButtonClickHandler = this.onStartButtonClickHandler.bind(this);
        this.onRestartButtonClickHandler = this.onRestartButtonClickHandler.bind(this);
    }

    getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    componentWillReceiveProps(nextProps) {
        const newResults = nextProps.navigation.getParam('results');

        if (newResults && newResults.length === 0) {
            return this.setState({ results: newResults, allResults: {}, colorLevel: 0, imageLevel: 0 });
        }

        let newColorLevel = this.state.colorLevel;
        let newImgLevel = this.state.imageLevel;

        if (newResults && newResults.length > 0 && (newResults.length % this.MAX_TRIALS === 0)) {
            newImgLevel = (newImgLevel + 1) % (this.IMG_LEVELS.length + 1);
        }

        if (newResults && newResults.length > 0 && (newResults.length % (this.IMG_LEVELS.length * this.MAX_TRIALS) === 0)) {
            newColorLevel = (newColorLevel + 1) % (this.COLOR_LEVELS.length + 1);
            newImgLevel = 0;
        }

        if (newResults && (newResults.length !== this.state.results.length)) {
            const newAllResults = this.getUpdatedResults(newResults);

            return this.setState({ results: newResults, allResults: newAllResults, colorLevel: newColorLevel, imageLevel: newImgLevel });
        }
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

    getUpdatedResults(newResults) {
        const updatedResults = { ...this.state.allResults };
        const timeTaken = newResults[newResults.length - 1];
        const colorLevel = this.COLOR_LEVELS[this.state.colorLevel];
        const imageLevel = this.IMG_LEVELS[this.state.imageLevel];
        const resultKey = `${colorLevel},${imageLevel}`;

        if (!updatedResults[colorLevel]) {
            updatedResults[colorLevel] = {};
        }

        if (updatedResults[colorLevel][imageLevel]) {
            updatedResults[colorLevel][imageLevel].push(timeTaken);
        } else {
            updatedResults[colorLevel][imageLevel] = [timeTaken];
        }

        return updatedResults;
    }

    render() {
        //When done will all the trials display the results
        if (this.state.results.length === this.MAX_TRIALS * this.COLOR_LEVELS.length * this.IMG_LEVELS.length) {
            return <Results results={this.state.results} onClick={this.onRestartButtonClickHandler} allResults={this.state.allResults} />;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Find this Picture</Text>
                <Image
                    style={styles.imageDimensions}
                    source={{ uri: this.state.image.url }}
                />
                <Text>Image ID: {this.state.image.id}</Text>
                {this.state.colorLevel === 0 && <Text style={styles.colorLevel}>Using <Text style={styles.numberOfFilter}>No</Text> color filters</Text>}
                {this.state.colorLevel === 1 && <Text style={styles.colorLevel}>Using <Text style={styles.numberOfFilter}>1</Text> color filter</Text>}
                {this.state.colorLevel === 2 && <Text style={styles.colorLevel}>Using <Text style={styles.numberOfFilter}>2</Text> color filters</Text>}

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
        fontSize: 40,
        color: 'blue'
    },
    numberOfFilter: {
        fontWeight: 'bold',
        color: 'red'
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
