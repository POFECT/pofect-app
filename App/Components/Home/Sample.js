// MyLineChart.js ordThwTapYMDCd      "ordCnt": 1

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MyLineChart = ({ ordYrList, ordMdList, ordCntList , ordList}) => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
            },
        ],
    };

    return (
        <>
            {/*{ordList.map((item, index) => (*/}
            {/*    <View key={index}>*/}
            {/*        <Text>Year Code: {item.ordThwTapYrCd}</Text>*/}
            {/*        <Text>Month Code: {item.ordThwTapMDCd}</Text>*/}
            {/*        <Text>Order Count: {item.ordCnt}</Text>*/}
            {/*        /!* Add other information as needed *!/*/}
            {/*    </View>*/}
            {/*))}*/}
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
