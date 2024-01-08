import { LineChart } from "react-native-gifted-charts"

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MyLineChart = ({ordList}) => {
    const data = ordList.map(({ ordCnt, ordThwTapYMDCd }) => ({
        value: ordCnt,
        labelComponent: () => customLabel(ordThwTapYMDCd.substring(2)),
    }));

    // const data = [
    //     {value: 250, label: 'M'},
    //     {value: 500, label: 'T', frontColor: '#177AD5'},
    //     {value: 745, label: 'W', frontColor: '#177AD5'},
    //     {value: 320, label: 'T'},
    //     {value: 600, label: 'F', frontColor: '#177AD5'},
    //     {value: 256, label: 'S'},
    //     {value: 300, label: 'S'},
    // ];

    const customLabel = val => {
        return (
            <View style={{width: 70, marginLeft: 7}}>
                <Text style={{
                    color: 'black',
                    fontFamily: 'LINESeedKR-Bd',
                    fontSize: 12,
                }}>{val}</Text>
            </View>
        );
    };

    return (
        <>
        <Text style={styles.header}>최근 출강주의 주문수</Text>

    <View
            style={{
                paddingVertical: 10,
                paddingLeft: 5,
                backgroundColor: '#fff',
            }}>

            <LineChart
            areaChart
            curved
            width={250}
            height={160}
            data={data}
            startFillColor="#0A5380"
            startOpacity={0.8}
            endFillColor="rgb(203, 241, 250)"
            endOpacity={0.3}
            isAnimated
            rotateLabel
        />
        </View>
    </>
    );
}
export default  MyLineChart;

const styles = StyleSheet.create({
    header: {
        fontFamily: 'TheJamsil5Bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: -40,
    },
});
