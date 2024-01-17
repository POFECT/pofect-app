import { PieChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
const legendLabels = ['주문 완료', '가통 설계', '가통 확정', '공장 결정', '제조 투입'];

const DonutChart = ({ cntList }) => {
    // 데이터 부분
    const maxIndex = cntList.indexOf(Math.max(...cntList));

    const pieData = [
        { value: cntList[0], color: '#009FFF', gradientCenterColor: '#006DFF',},
        { value: cntList[1], color: '#93FCF8', gradientCenterColor: '#3BE9DE' ,},
        { value: cntList[2], color: '#BDB2FA', gradientCenterColor: '#8F80F3', },
        { value: cntList[3], color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
        { value: cntList[4], color: '#FFD700', gradientCenterColor: '#FFB400' },
    ];
    if (maxIndex >= 0 && maxIndex < pieData.length) {
        pieData[maxIndex].focused = true;
    }
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
        const rows = Math.ceil(legendLabels.length / 2);
        return (
            <>
                <View
                    style={{
                        flexDirection: 'column', // Change to column direction
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    {[...Array(rows)].map((_, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {legendLabels.slice(rowIndex * 2, rowIndex * 2 + 2).map((label, index) => (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: (index < legendLabels.length - 1 ? 10 : -10),
                                        padding: (index < legendLabels.length - 1 ? 5 : 0),

                                    }}>
                                    {renderDot(pieData[rowIndex * 2 + index].color)}

                                    <View style={{ display: 'flex', alignItems: 'left',   }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'left', marginRight: -5 , marginBottom:-10,  padding:3}}>
                                            <Text style={{ color: 'white', fontFamily: 'LINESeedKR-Rg' }}>{label} : {cntList[rowIndex * 2 + index]} 건</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'left' }}>
                                            <Text style={{ color: 'white', fontFamily: 'LINESeedKR-Rg', }}></Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 25,
                borderRadius: 10,
                backgroundColor: '#E7F3F8',
                marginTop : -15
            }}>
            <View
                style={{
                    margin: 20,
                    padding: 16,
                    borderRadius: 20,
                    // marginBottom:10,

                    backgroundColor: '#232B5D',
                }}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'LINESeedKR-Bd', }}>
                    진행 상태 별 주문 수
                </Text>
                <View style={{ padding: 20, alignItems: 'center' }}>

                    <PieChart
                        data={pieData}
                        donut
                        textSize={20}

                        showGradient
                        sectionAutoFocus
                        focusOnPress
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#232B5D'}
                        isAnimated
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontFamily: 'LINESeedKR-Bd', }}>
                                        {cntList[maxIndex]} 건
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white', fontFamily: 'LINESeedKR-Rg', }}>{legendLabels[maxIndex]}</Text>
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