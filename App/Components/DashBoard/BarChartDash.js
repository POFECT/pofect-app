import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import CapacityApi from '../../APIs/CapacityApi';
import { useTranslation } from 'react-i18next';

const InputStatusBar = () => {
    const { t } = useTranslation();


    const [barData, setBarData] = useState([]);


    useEffect(() => {
        CapacityApi.getCapacityListByWeek('20240130', (responseData) => {
            const newBarData = responseData.response.map((item) => {
                const label = `${item.firmPsFacTp}${mapLabels(item.processName)}`;
                return {
                    value: (item.remainQty / item.planQty) * 100,
                    label: label,
                    spacing: 2,
                    labelWidth: 40,
                    labelTextStyle: { color: 'gray' },
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
        switch (processName.toLowerCase()) {
            case '1차소둔':
                return 'CAL';
            case '2차소둔':
                return 'ACL';
            // Add more cases as needed for other process names
            default:
                return processName; // Use the original processName if no mapping is defined
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
                                width: 45,
                                height: 16,
                                color: 'lightgray',
                            }}>
                            {t('dashboardComponent.orderCnt')}
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
                        yAxisTextStyle={{ color: 'gray' }}
                        noOfSections={5}
                        maxValue={100}
                        isAnimated
                        yAxisLabelSuffix={"%"}

                        animationDuration={1200}

                        renderTooltip={(item, index) => {
                            return (
                                <View
                                    style={{
                                        marginBottom: 2,
                                        marginLeft: 8,
                                        backgroundColor: '#e9e9ea',
                                        paddingHorizontal: 6,
                                        paddingVertical: 4,
                                        borderRadius: 4,
                                    }}>
                                    <Text style={{fontFamily:'LINESeedKR-Bd'}}>{item.value}</Text>
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