import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const MyLineChart = ({ ordList }) => {
    const data = ordList.map(({ ordCnt, ordThwTapYMDCd }) => ({
        value: ordCnt,
        labelComponent: () => customLabel(ordThwTapYMDCd.substring(2)),
    })).reverse();

    const customLabel = (val) => (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{val}</Text>
        </View>
    );

    return (
        <>
            <Text style={styles.header}>출강주차 별 주문 통계</Text>
            <View style={styles.chartContainerOut}>

            <View style={styles.chartContainer}>
                <LineChart
                    areaChart
                    curved
                    width={240}
                    height={200}
                    data={data}
                    startFillColor="#232B5D"
                    startOpacity={0.8}
                    endFillColor="rgb(203, 241, 250)"
                    endOpacity={0.3}
                    isAnimated
                    rotateLabel
                />
            </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'LINESeedKR-Bd',
        textAlign: 'center',
        fontSize: 22,
        padding: 16,
        marginTop: -40,

        color: '#09537F',
    },

    chartContainerOut: {
        width: 350,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    chartContainer:{
        marginBottom: 15,
        marginLeft:4,

    },
    labelContainer: {
        width: 60,
        marginLeft: 7,
        marginTop:6,
    },
    labelText: {
        color: 'black',
        fontFamily: 'LINESeedKR-Bd',
        fontSize: 12,
    },
});

export default MyLineChart;
