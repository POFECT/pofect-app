import React from 'react';
import { View, Platform } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';


const ProgressChartExample = () => {
    const data = {
        labels: ['Progress'],
        data: [0.6], // Change this value to represent the progress (0 to 1)
    };

    return (
        <View>
            <ProgressChart
                data={data}
                width={280}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                hideLegend={false}
                style={{
                    borderRadius: 16,
                    ...Platform.select({
                        ios: {
                            shadowColor: "#000",
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
                    })
                }}
            />
        </View>
    );
};

export default ProgressChartExample;
