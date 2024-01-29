import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import CapacityApi from '../../APIs/CapacityApi';
import { useTranslation } from 'react-i18next';

const InputStatusBar = () => {
    const { t, i18n } = useTranslation();


    const [barData, setBarData] = useState([]);


    useEffect(() => {
        CapacityApi.getCapacityListByWeek('20240131', (responseData) => {
            const newBarData = responseData.response.map((item) => {
                const label = `${item.firmPsFacTp}${mapLabels(item.processName)}`;
                const calculatedValue = (item.remainQty / item.planQty) * 100;
                const valueRounded = parseFloat(calculatedValue.toFixed(2)); // 소수점 둘째 자리까지 반올림 후 숫자로 변환
                return {
                    value: valueRounded,
                    label: label,
                    spacing: 2,
                    labelWidth: 40,
                    labelTextStyle: { color: 'white' },
                    frontColor: '#fbccff',
                };
            });
            setBarData(newBarData);
        });
    }, []);

    const xLabels = [
        "1제강", "2제강", "1열연", "2열연", "1열연정정", "2열연정정",
        "1PCM", "2PCM", "3PCM",
        "1CAL", "2CAL", "3CAL",
        "1ACL", "3ACL",
        "2EGL", "3EGL",
        "1RCL",
    ];

    const mapLabels = (processName) => {
        if (i18n.language === 'en') {
            switch (processName.toLowerCase()) {
                case '제강':
                    return 'SM';
                case '열연':
                    return 'HR';
                case '열연정정':
                    return 'HRL';
                case '1차소둔':
                    return 'CAL';
                case '2차소둔':
                    return 'ACL';
                case '냉간압연':
                    return 'PCM';
                case '도금':
                    return 'EGL';
                case '정정':
                    return 'RCL';
                default:
                    return processName; // 일치하는 레이블이 없는 경우 기본 이름 반환
            }
        } else {
            switch (processName.toLowerCase()) {
                case '1차소둔':
                    return 'CAL';
                case '2차소둔':
                    return 'ACL';
                case '냉간압연':
                    return 'PCM';
                case '도금':
                    return 'EGL';
                case '정정':
                    return 'RCL';
                // 여기에 기본 레이블 추가...
                default:
                    return processName; // 일치하는 레이블이 없는 경우 기본 이름 반환
            }
        }
    };


    const renderTitle = () => {
        return (
            <View style={{marginVertical: 55, marginTop: 30}}>
                <Text
                    style={{
                        marginTop: -10,
                        color: 'white',
                        fontSize: 18,
                        fontFamily: 'LINESeedKR-Bd',
                        textAlign: 'center',

                    }}>
                    {t('dashboardComponent.FactoryLoad')}
                </Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                        backgroundColor: 'yellow',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 12,
                                backgroundColor: '#fbccff',
                                marginRight: 8,
                            }}
                        />
                        <Text
                            style={{
                                width: i18n.language === 'en' ? 77 : 45, // 영어일 때 너비를 60으로, 아니면 45로 설정
                                height: 16,
                                color: 'white',
                            }}>
                            {t('dashboardComponent.percent')}
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
                paddingVertical: 25,
                borderRadius: 10,
                backgroundColor: '#e9e9ea',
                marginTop : -10
            }}>
            <View
                style={{
                    backgroundColor: '#333340',
                    margin: 20,
                    padding: 16,
                    borderRadius: 20,
                }}>
                {renderTitle()}

                <View style={{ padding: 20, alignItems: 'center' }}>

                    <BarChart
                        data={barData}
                        barWidth={50}
                        spacing={24}
                        hideRules
                        // xAxisLabelsVerticalShift={120}
                        xAxisTextNumberOfLines={2}
                        xAxisThickness={0}
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: 'white' }}
                        noOfSections={5}
                        maxValue={100}
                        isAnimated
                        yAxisLabelSuffix={"%"}

                        animationDuration={1200}

                        renderTooltip={(item, index) => {
                            return (
                                <View
                                    style={{
                                        width: 53,
                                        marginBottom: 4,

                                        backgroundColor: '#e9e9ea',
                                        paddingHorizontal: 6,
                                        paddingVertical: 4,
                                        borderRadius: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                    <Text style={{ fontFamily: 'LINESeedKR-Bd' }}>{item.value}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default InputStatusBar;