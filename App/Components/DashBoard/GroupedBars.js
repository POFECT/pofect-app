import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DashBoardApi from '../../APIs/DashBoardApi';
import { useTranslation } from 'react-i18next';

const InputStatusBar = () => {
    const { t } = useTranslation();

    const [barData, setBarData] = useState([]);

    useEffect(() => {
        DashBoardApi.getDashBoardInputStatus('20240130',(responseData) => {
            const newBarData = responseData.response.map((item) => ({
                value: item.count,
                label: item.ordPdtItpCdN,
                spacing: 2,
                labelWidth: 20,
                labelTextStyle: { color: 'gray' },
                frontColor: '#5D8BF4',
            }));
            setBarData(newBarData);
        });
    }, []);


    const renderTitle = () => {
        return (
            <View style={{ marginVertical: 55 ,marginTop:30}}>
                <Text
                    style={{
                        marginTop:-10,
                        color: 'white',
                        fontSize: 18,
                        fontFamily: 'LINESeedKR-Bd',
                        textAlign: 'center',

                    }}>
                    {t('dashboardComponent.orderByItemType')}
                </Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                        backgroundColor: 'yellow',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 12,
                                backgroundColor: '#5D8BF4',
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
                    barWidth={22}
                    spacing={24}
                    roundedTop
                    roundedBottom
                    hideRules
                    yAxisTextStyle={{
                        fontFamily: 'LINESeedKR-Bd',
                        marginLeft:-10,
                        color: 'gray'
                    }}
                    xAxisThickness={0}
                    yAxisThickness={0}
                    noOfSections={3}
                    maxValue={45}


                    isAnimated
                    animationDuration={1200}

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