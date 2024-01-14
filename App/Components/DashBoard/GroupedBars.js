import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DashBoardApi from '../../APIs/DashBoardApi';

const InputStatusBar = () => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        DashBoardApi.getDashBoardInputStatus((responseData) => {
            const newBarData = responseData.response.map((item) => ({
                value: item.count,
                label: item.ordPdtItpCdN,
                spacing: 2,
                labelWidth: 30,
                labelTextStyle: { color: 'gray' },
                frontColor: '#177AD5', // or any color you want to set
            }));
            setBarData(newBarData);
        });
    }, []);

    const renderTitle = () => {
        return (
            <View style={{ marginVertical: 30 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'LINESeedKR-Bd',
                        textAlign: 'center',
                    }}>
                    품종 별 투입 현황
                </Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 24,
                        backgroundColor: 'yellow',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#177AD5',
                                marginRight: 8,
                            }}
                        />
                        <Text
                            style={{
                                width: 30,
                                height: 16,
                                color: 'lightgray',
                            }}>
                            품종
                        </Text>
                    </View>
                    {/* You can add more legend points as needed */}
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 70,
                borderRadius: 10,
                paddingHorizontal: 20,
                backgroundColor: '#e9e9ea',
            }}>
            <View
                style={{
                    backgroundColor: '#333340',
                    paddingBottom: 40,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                }}>
                {renderTitle()}
                <BarChart
                    data={barData}
                    barWidth={22}
                    spacing={24}
                    roundedTop
                    roundedBottom
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: 'gray' }}
                    noOfSections={3}
                    maxValue={150}
                    isAnimated
                />
            </View>
        </View>
    );
};

export default InputStatusBar;