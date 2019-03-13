import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../data/images';
import { setFirstColorFilter, setSecondColorFilter } from '../actions/colorFilterActions';

class AlbumHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.roundButton} onPress={() => this.props.setFirstColorFilter(colors.red)}>
                    <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton} onPress={() => this.props.setSecondColorFilter(colors.blue)}>
                    <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    roundButton: {
        width: 100,
        height: 100,
        backgroundColor: '#dddddd',
        borderRadius: 100,
        marginTop: 30
    },
    imageInBox: {
        width: 100,
        height: 100,
        borderRadius: 100,
    }
});

const mapStateToProps = state => ({
    firstColorFilter: state.colorFilter.firstColorFilter,
    secondColorFilter: state.colorFilter.secondColorFilter
});

export default connect(
    mapStateToProps,
    { setFirstColorFilter, setSecondColorFilter }
)(AlbumHeader);
