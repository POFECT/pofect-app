import React, { useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';

const LineChartExample = ({ ordList }) => {
    const opacity = useSharedValue(0);
    const fadeIn = () => {
        opacity.value = withSpring(1, { damping: 2, stiffness: 80 });
    };

    const chartRef = useRef(null);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        fadeIn();
    }, []);



    const chartData = {
        labels: ordList.map((item) => item.ordThwTapMDCd),
        datasets: [
            {
                data: ordList.map((item) =>  item.ordCnt),
            },
        ],

    };

    return (
        <View>
            <Animated.View style={[animatedStyles]}>

                <LineChart
                    data={chartData}
                    width={280}
                    height={220}
                    yAxisLabel={''}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                            fontFamily: 'TheJamsil5Bold',

                        },
                    }}
                    bezier
                    style={{
                        borderRadius: 16,
                        fontFamily: 'TheJamsil5Bold',
                        ...Platform.select({
                            ios: {
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                            },
                            android: {
                                elevation: 4,
                            },
                        }),
                    }}
                    ref={chartRef}
                />

            </Animated.View>
        </View>
    );
};

export default LineChartExample;