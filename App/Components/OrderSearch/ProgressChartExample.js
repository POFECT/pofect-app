import React, {useEffect, useState} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import Size from "../../Utils/Size";

const ProgressChartExample = ({orderData}) => {
    if (!orderData || orderData.length === 0) {
        return null;
    }
    const [width, setWidth] = useState(0);

    useEffect(() => {
        console.log('Order Data:', orderData); // Log orderData here to check its value

    }, [orderData]);
    const barData = [
        {
            value: orderData.orderWidth,
            label: '폭',
            frontColor: 'rgba(10,83,128,0.73)',
            sideColor: 'rgb(10,83,128)',
            topColor: 'rgba(10,83,128,0.18)',
        },
    ]
    return (
        <View style={styles.container}>
            <BarChart
                horizontal
                showFractionalValue
                showYAxisIndices
                hideRules
                noOfSections={3}
                maxValue={3000}
                data={barData}
                barWidth={40}
                sideWidth={15}
                isThreeD
                side="right"
                isAnimated
                xAxisLabelTextStyle={{
                    textAlign: 'center',
                    fontFamily: 'LINESeedKR-Bd'
                }}
                yAxisLabelTextStyle={{
                    textAlign: 'center',
                    fontFamily: 'LINESeedKR-Bd'
                }}
               barStyle={{
                   // marginRight:30,
               }}


            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        transform: [
            { translateX: -Size.width * 0.33},
            { translateY: Size.height * 0.016 },
        ],
        width:240,
        height: 200,
        marinTop: 30,
        borderRadius: 16,
    },
});

export default ProgressChartExample;