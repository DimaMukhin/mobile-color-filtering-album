import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

export default ({ results, onClick }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Experiment Finished</Text>
            <FlatList
                data={results}
                renderItem={({ index, item }) => <Text style={styles.item} key={index}>{`Trial #${index + 1}: ${item}ms`}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.restartButton}>
                <Button onPress={() => onClick()} title='Restart' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        alignItems: 'center'
    },
    restartButton: {
        width: '80%',
        height: 50
        },
    heading: {
        fontWeight: 'bold',
        fontSize: 30
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
});
