import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const getAverage = (ar) => {    
    const sum = ar.reduce((curr, sum) => sum + curr, 0); 
    return sum / ar.length;  
}

export default ({ results, onClick }) => {
    const average = getAverage(results); 
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Experiment Finished</Text>
            <FlatList
                data={results}
                renderItem={({ index, item }) => <Text style={styles.item} key={index}>{`Trial #${index + 1}: ${item}ms`}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.mediumFont}>Average: {average}ms</Text>
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
    mediumFont: {
        fontWeight: 'bold', 
        fontSize: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
});
