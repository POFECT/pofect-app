// ChartComponent.js

import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MyBarChart from './MyBarChart';
import MainApi from "../../APIs/MainApi";

const ChartComponent = ({  }) => {


    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <MyBarChart />
                </View>
            </View>
        </ScrollView>
    );
};

export default ChartComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
});
