import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Results from '../components/Results';
import images from '../data/images';

export default class MainWindow extends Component {
    MAX_TRIALS = 10;

    constructor(props) {
        super(props);
        this.state = {
            trial: 0,
            image: this.getRandomImage(),
            results: []
        };

        this.onStartButtonClickHandler = this.onStartButtonClickHandler.bind(this);
        this.onRestartButtonClickHandler = this.onRestartButtonClickHandler.bind(this);
    }

    getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newResults = nextProps.navigation.getParam('results');

        if (newResults && (newResults.length !== prevState.results.length)) {
            return { results: newResults };
        }

        return null;
    }

    onStartButtonClickHandler() {
        const image = this.getRandomImage();
        const startTime = new Date().getTime();

        this.props.navigation.navigate('ImageGallery', { startTime, results: this.state.results });
        this.setState({ image });
    }

    onRestartButtonClickHandler() {
        this.props.navigation.navigate('MainWindow', { results: [] });
    }

    render() {

        //When done will all the trials display the results
        if (this.state.results.length === this.MAX_TRIALS) {
            return <Results results={this.state.results} onClick={this.onRestartButtonClickHandler} />;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Find this Picture</Text>
                <Image
                    style={styles.imageDimensions}
                    source={{ uri: this.state.image.url }}
                />
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
    imageDimensions: {
        width: 350,
        height: 350
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        alignItems: 'center'
    }
});
