import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

const MyLineChart = ({ ordList }) => {

    const { t } = useTranslation();

    const data = ordList.map(({ ordCnt, ordThwTapYMDCd }) => ({
        value: ordCnt,
        labelComponent: () => customLabel(ordThwTapYMDCd.substring(2)),
    })).reverse();

    const customLabel = (val) => (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{val}</Text>
        </View>
    );

    return (
        <>
            <Text style={styles.header}>{t('homeComponent.weekByOrderCnt')}</Text>
            <View style={styles.chartContainerOut}>

            <View style={styles.chartContainer}>
                <LineChart
                    areaChart
                    curved
                    hideRules

                    yAxisColor="#051367"
                    xAxisColor="#051367"

                    width={240}
                    height={200}
                    data={data}
                    maxValue={200}
                    yAxisTextStyle={{
                        fontFamily: 'LINESeedKR-Bd',
                        marginLeft:-5,
                    }}
                    startFillColor="#232B5D"
                    startOpacity={0.8}
                    endFillColor="rgb(203, 241, 250)"
                    endOpacity={0.3}
                    isAnimated

                    // pointerStripUptoDataPoint
                    animationDuration={1200}
                    rotateLabel
                    yMax={200}

                    pointerConfig={{
                        pointerStripHeight: 160,
                        pointerStripColor: 'lightgray',
                        pointerStripWidth: 2,
                        pointerColor: 'lightgray',
                        radius: 6,
                        // pointerLabelWidth: 100,
                        // pointerLabelHeight: 90,
                        // activatePointersOnLongPress: true,
                        autoAdjustPointerLabelPosition: false,
                        pointerLabelComponent: items => {
                            return (
                                <View
                                    style={{
                                        height: 90,
                                        width: 100,
                                        justifyContent: 'center',
                                        marginTop: -30,
                                        marginLeft: -40,
                                    }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 14,
                                            marginBottom: 6,
                                            textAlign: 'center',
                                        }}>
                                        {items[0].date}
                                    </Text>

                                    <View
                                        style={{
                                            paddingHorizontal: 14,
                                            paddingVertical: 6,
                                            borderRadius: 16,
                                            backgroundColor: 'white',
                                        }}>
                                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            {items[0].value + '건'}
                                        </Text>
                                    </View>
                                </View>
                            );
                        },
                    }}
                />
            </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'LINESeedKR-Bd',
        textAlign: 'center',
        fontSize: 22,
        padding: 16,
        marginTop: -40,

        color: '#051367',
    },

    chartContainerOut: {
        width: 350,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    chartContainer:{
        marginBottom: 15,
        marginLeft:15,

    },
    labelContainer: {
        width: 60,
        marginLeft: 7,
        marginTop:6,
    },
    labelText: {
        color: 'black',
        fontFamily: 'LINESeedKR-Bd',
        fontSize: 12,
    },
});

export default MyLineChart;
