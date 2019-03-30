import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const getAverage = (ar) => {
    const sum = ar.reduce((curr, sum) => sum + curr, 0);
    return Math.round(sum / ar.length * 100) / 100;
}

const formatResults = (data) => {
    const fmtAr = [];
    for (let colorLevel in data) {
        let result = { colorLevel };
        result.imgLevels = [];
        for (let imgLevel in data[colorLevel]) {
            const times = data[colorLevel][imgLevel];
            const average = getAverage(times);

            result.imgLevels.push({ imgLevel, times, average });
        }
        fmtAr.push(result);
    }

    return fmtAr;
}

export default ({ results, onClick, allResults }) => {
    const average = getAverage(results);
    const fmtResults = formatResults(allResults);
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Experiment Finished</Text>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={fmtResults}
                renderItem={({ index, item }) => {

                    return (

                        <View key={item.colorLevel + index.toString()} style={styles.mdMarginTop}>
                            <Text style={styles.heading}> {item.colorLevel} </Text>

                            <FlatList
                                data={item.imgLevels}
                                renderItem={({ index, item }) => {

                                    return (
                                        <View key={item.average + index + 'levels'} style={styles.mdMarginTop}>
                                            <Text style={styles.mediumBoldFont}>Number of Images</Text>
                                            <Text style={styles.mediumFont}>{item.imgLevel}</Text>
                                            <Text style={styles.mediumBoldFont}>Times</Text>

                                            <FlatList
                                                style={{ marginLeft: 20 }}
                                                data={item.times}
                                                renderItem={({ item, index }) => <Text style={styles.mediumFont} key={`${item}-${index}`}> <Text style={styles.mediumBoldFont}>{index + 1}. </Text> {item}ms</Text>}
                                            />

                                            <Text key={item.average + index.toString() + 'average'} style={styles.mediumFont}><Text style={styles.mediumBoldFont}>Average: </Text> {item.average}ms </Text>
                                        </View>
                                    )

                                }
                                }
                            />
                        </View>
                    )
                }
                }
            />
            <Text style={styles.mediumFont}>Total Average Time: {average}ms</Text>
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
        fontSize: 20
    },
    mediumBoldFont: {
        fontWeight: 'bold',
        fontSize: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    mdMarginTop: {
        marginTop: 20
    }
});
