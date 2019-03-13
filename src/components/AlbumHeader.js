import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../data/images';
import { setFirstColorFilter, setSecondColorFilter } from '../actions/colorFilterActions';

class AlbumHeader extends Component {
    render() {
        const firstButtonBackgroundColor = this.props.firstColorFilter != null ? this.props.firstColorFilter : '#dddddd';
        const secondButtonBackgroundColor = this.props.secondColorFilter != null ? this.props.secondColorFilter : '#dddddd';

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ ...styles.firstRoundButton, backgroundColor: firstButtonBackgroundColor }}
                    onPress={() => this.props.setFirstColorFilter(colors.red)}>
                    {
                        this.props.firstColorFilter == null
                            ? <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                            : null
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.firstRoundButton, backgroundColor: secondButtonBackgroundColor }}
                    onPress={() => this.props.setSecondColorFilter(colors.blue)}>
                    {
                        this.props.secondColorFilter == null
                            ? <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                            : null
                    }
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
    firstRoundButton: {
        width: 100,
        height: 100,
        backgroundColor: '#dddddd',
        borderRadius: 100,
        marginTop: 30
    },
    secondRoundButton: {
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
