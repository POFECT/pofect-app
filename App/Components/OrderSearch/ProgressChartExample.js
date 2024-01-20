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
    return (
        <View style={styles.chartContainerOut}>

            <View style={styles.chartContainer}>
                <BarChart
                    horizontal
                    showFractionalValue
                    showYAxisIndices
                    hideRules
                    noOfSections={5}
                    maxValue={3000}
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
                    hideOrigin
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
                    hideRules
                    noOfSections={5}
                    // maxValue={700}
                    data={barData2}
                    // width={220}
                    barWidth={40}
                    sideWidth={25}
                    isThreeD
                    side="right"
                    isAnimated
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

        // paddingVertical: 40,
        paddingHorizontal: 16,
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
        marginBottom: -100,
        marginLeft:0,

    },
});

export default ProgressChartExample;