import React, {useEffect, useState} from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import Size from "../../Utils/Size";

const ProgressChartExample = ({orderData}) => {
    if (!orderData || orderData.length === 0) {
        return null;
    }

    useEffect(() => {
        // console.log('Order Data:', orderData); //

    }, [orderData]);

    const calculateMaxValue = (data) => {
        const max = data.reduce((maxValue, item) => Math.max(maxValue, item.value), 0);
        const bufferPercentage = 0.1;
        return Math.ceil(max * (1 + bufferPercentage));
    };
    const barData = [
        {
            value: orderData.orderWidth,
            label: 'Width',
            frontColor: 'rgba(173,193,230,0.73)',  // Light Blue
            sideColor: 'rgb(173,189,230)',           // Light Blue
            topColor: 'rgba(173, 216, 230, 0.18)',     // Light Blue
        },
    ];

    const barData2 = [
        {
            value: orderData.orderThick,
            label: 'Thick',
            frontColor: 'rgba(255, 182, 193, 0.73)',  // Light Pink
            sideColor: 'rgb(255, 182, 193)',           // Light Pink
            topColor: 'rgba(255, 182, 193, 0.18)',     // Light Pink
        },
    ];
    const maxValue1 = calculateMaxValue(barData);
    const maxValue2 = calculateMaxValue(barData2);
    return (
        <View style={styles.chartContainerOut}>

            <View style={styles.chartContainer}>
                <BarChart
                    horizontal
                    showFractionalValue
                    showYAxisIndices
                    // hideRules
                    noOfSections={2}
                    maxValue={maxValue1}
                    data={barData}
                    // width={220}
                    barWidth={40}
                    sideWidth={25}
                    isThreeD
                    side="right"
                    yAxisAtTop
                    yAxisLabelSuffix="mm"
                    yAxisTextNumberOfLines={2}
                    isAnimated
                    xAxisLabelTextStyle={{
                        textAlign: 'center',
                        fontFamily: 'LINESeedKR-Bd',
                        marginTop: -10,
                    }}

                    yAxisLabelTextStyle={{
                        textAlign: 'left',
                        fontFamily: 'LINESeedKR-Bd',
                        marginleft: -10,
                    }}
                    barStyle={{
                        // marginRight:30,
                    }}
                    rotateLabel
                    renderTooltip={(item, index) => {
                        return (
                            <View
                                style={{
                                    marginBottom: 20,
                                    marginLeft: -5,
                                    backgroundColor: '#e9e9ea',
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                    transform: [{rotate: '-90deg'}],

                                }}>
                                <Text style={{fontFamily: 'LINESeedKR-Bd'}}>{item.value}</Text>
                            </View>
                        );
                    }}

                />

            </View>
            <View style={styles.chartContainer}>
                <BarChart
                    horizontal
                    showFractionalValue
                    showYAxisIndices
                    // hideRules
                    yAxisTextNumberOfLines={2}

                    noOfSections={5}
                    maxValue={maxValue2}
                    data={barData2}
                    // width={220}
                    barWidth={40}
                    sideWidth={25}
                    isThreeD
                    showFractionalValues
                    side="right"
                    isAnimated
                    yAxisLabelSuffix=" mm"

                    xAxisLabelTextStyle={{
                        textAlign: 'center',
                        fontFamily: 'LINESeedKR-Bd',
                        marginTop: -10,

                    }}
                    yAxisLabelTextStyle={{
                        textAlign: 'center',
                        fontFamily: 'LINESeedKR-Bd',
                    }}
                    barStyle={{
                        // marginRight:30,
                    }}
                    rotateLabel
                    renderTooltip={(item, index) => {
                        return (
                            <View
                                style={{
                                    marginBottom: 10,
                                    marginLeft: -3,
                                    backgroundColor: '#e9e9ea',
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                    transform: [{rotate: '-90deg'}],

                                }}>
                                <Text style={{fontFamily: 'LINESeedKR-Bd'}}>{item.value}</Text>
                            </View>

                        );
                    }}

                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',

        width:260,
        height: 200,
        marinTop: 30,
    },
    chartContainerOut: {
        width: 350,
        height: 300,

        paddingVertical: 40,
        // paddingHorizontal: 16,
        paddingTop: 32,

        backgroundColor: '#fff',
        borderRadius: 10,
        // marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    chartContainer:{
        marginBottom: -150,
        marginLeft:0,

    },
});

export default ProgressChartExample;