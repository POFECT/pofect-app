// MyLineChart.js

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MyLineChart = ({ ordList }) => {
    const chartData = {
        labels: ordList.map((item) => item.ordThwTapMDCd),
        datasets: [
            {
                data: ordList.map((item) => item.ordCnt),
            },
        ],
    };

    return (
        <>
            <Text style={styles.header}>최근 출강주의 주문수</Text>
            <LineChart
                data={chartData}
                width={280}
                height={220}
                yAxisLabel={''}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    borderRadius: 16,
                }}
            />
        </>
    );
};

export default MyLineChart;

const styles = StyleSheet.create({
    header: {
        fontFamily: 'TheJamsil5Bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: -40,
    },
});
