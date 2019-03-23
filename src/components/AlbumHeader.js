import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { colors } from '../data/images';
import { setFirstColorFilter, setSecondColorFilter } from '../actions/colorFilterActions';

class AlbumHeader extends Component {
    state = {
        selectColor: 0
    };

    setFilterColorAndCloseModal = (color, colorFilterNumber) => {
        if (colorFilterNumber == 1)
            this.props.setFirstColorFilter(color);
        else if (colorFilterNumber == 2)
            this.props.setSecondColorFilter(color);

        this.setState({ selectColor: 0 });
    };

    render() {
        const firstButtonBackgroundColor = this.props.firstColorFilter != null ? this.props.firstColorFilter : '#dddddd';
        const secondButtonBackgroundColor = this.props.secondColorFilter != null ? this.props.secondColorFilter : '#dddddd';

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ ...styles.colorFilterRoundButton, backgroundColor: firstButtonBackgroundColor }}
                    onPress={() => this.setState({ selectColor: 1 })}>
                    {
                        this.props.firstColorFilter == null
                            ? <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                            : null
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.colorFilterRoundButton, backgroundColor: secondButtonBackgroundColor }}
                    onPress={() => this.setState({ selectColor: 2 })}>
                    {
                        this.props.secondColorFilter == null
                            ? <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.imageInBox} />
                            : null
                    }
                </TouchableOpacity>

                <Dialog
                    visible={!!this.state.selectColor}
                    onTouchOutside={() => {
                        this.setState({ selectColor: 0 });
                    }}
                >
                    <DialogContent>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.red, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.red}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.orange, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.orange}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.yellow, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.yellow}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.green, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.green}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.blue, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.blue}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.purple, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.purple}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.pink, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.pink}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.grey, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.grey}}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(colors.brown, this.state.selectColor)}>
                                <View style={{...styles.changeColorButton, backgroundColor: colors.brown}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setFilterColorAndCloseModal(null, this.state.selectColor)}>
                                <Image source={{ uri: 'https://www.shareicon.net/download/2015/10/18/658157_round_512x512.png' }} style={styles.changeColorButton} />
                            </TouchableOpacity>
                        </View>
                    </DialogContent>
                </Dialog>
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
    colorFilterRoundButton: {
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
    },
    modalContainer: {
        width: '95%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    changeColorButton: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#dddddd',
        marginTop: 8,
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
