import React, {useEffect, useState} from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import Size from "../../Utils/Size";

const ProgressChartExample = ({orderData}) => {
    if (!orderData || orderData.length === 0) {
        return null;
    }

    useEffect(() => {
        console.log('Order Data:', orderData); // Log orderData here to check its value

    }, [orderData]);
    const barData = [
        {
            value: orderData.orderWidth,
            label: 'Width',
            frontColor: 'rgba(10,83,128,0.73)',
            sideColor: 'rgb(10,83,128)',
            topColor: 'rgba(10,83,128,0.18)',
        },
    ]
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
                isAnimated
                xAxisLabelTextStyle={{
                    textAlign: 'center',
                    fontFamily: 'LINESeedKR-Bd',
                    marginTop:-10,

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
                                transform: [{ rotate: '-90deg' }],

                            }}>
                            <Text style={{fontFamily:'LINESeedKR-Bd'}}>{item.value}</Text>
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
        marginTop: 38,
        marginLeft:4,

    },
});

export default ProgressChartExample;