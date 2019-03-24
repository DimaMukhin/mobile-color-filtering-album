import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

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

    onAlbumItemPress = (image) => {
        const endTime = new Date();
        this.props.onClick(image, endTime.getTime());
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.images}
                    renderItem={({ item }) => <AlbumItem url={item.url} onPress={() => this.onAlbumItemPress(item)} />}
                    keyExtractor={(item) => '' + item.id}
                    numColumns={2}>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    }
});
