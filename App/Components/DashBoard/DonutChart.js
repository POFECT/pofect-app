import { PieChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

const DonutChart = ({ cntList }) => {
    // Sample data to be replaced with cntList
    const pieData = [
        { value: cntList[0], color: '#009FFF', gradientCenterColor: '#006DFF', focused: true },
        { value: cntList[1], color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: cntList[2], color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: cntList[3], color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
        { value: cntList[4], color: '#FFD700', gradientCenterColor: '#FFB400' },
    ];

    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        // Render legend based on cntList
        const legendLabels = ['주문 완료', 'Good', 'Okay', 'Poor'];
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    {legendLabels.map((label, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: 120,
                                marginRight: (index % 2 === 1) ? 20 : (index < legendLabels.length - 1 ? 20 : 0),
                            }}>
                            {renderDot(pieData[index].color)}

                            {(index % 2 === 1) && (
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                                    <Text style={{ color: 'white', fontFamily: 'LINESeedKR-Rg' }}>{label}: {cntList[index]}%</Text>
                                </View>
                            )}
                            {(index % 2 === 0) && (
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                                    <Text style={{ color: 'white', fontFamily: 'LINESeedKR-Rg' }}>{label}: {cntList[index]}%</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 70,
                borderRadius: 10,
                backgroundColor: '#E7F3F8',
            }}>
            <View
                style={{
                    margin: 20,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: '#232B5D',
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'LINESeedKR-Bd', }}>
                    진행 상태 별 주문 수
                </Text>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#232B5D'}
                        isAnimated
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontFamily: 'LINESeedKR-Bd', }}>
                                        {cntList[0]}%
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white', fontFamily: 'LINESeedKR-Rg', }}>Excellent</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                {renderLegendComponent()}
            </View>
        </View>
    );
}

export default DonutChart;