import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { colors } from '../data/images';

export default (props) => (
    <View style={styles.container}>
        <View style={{ backgroundColor: 'white', height: 24 }} />
        <View style={{ ...styles.filtersRow, marginTop: 10 }}>
            <Button color="red" title="" onPress={() => props.onClick(colors.red)} />
            <Button color="orange" title="" onPress={() => props.onClick(colors.orange)} />
            <Button color="yellow" title="" onPress={() => props.onClick(colors.yellow)} />
            <Button color="green" title="" onPress={() => props.onClick(colors.green)} />
            <Button color="blue" title="" onPress={() => props.onClick(colors.blue)} />
        </View>
        <View style={styles.filtersRow}>
            <Button color="purple" title="" onPress={() => props.onClick(colors.purple)} />
            <Button color="pink" title="" onPress={() => props.onClick(colors.pink)} />
            <Button color="grey" title="" onPress={() => props.onClick(colors.grey)} />
            <Button color="brown" title="" onPress={() => props.onClick(colors.brown)} />
            <Button color="white" title="" onPress={() => props.onClick()} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 104,
        backgroundColor: '#EEEEEE'
    },
    filtersRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10
    }
});
