// ChartComponent.js

import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MyLineChart from "./BarChart";


const ChartComponent = ({ ordList}) => {


    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <MyLineChart ordYrList={ordYrList} ordMdList={ordMdList} ordCntList={ordCntList } ordList={ordList} />
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
