import React, {useState, useCallback, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ProgressChartExample from "./ProgressChartExample";
import MainApi from "../../APIs/MainApi";
import {useTranslation} from "react-i18next";

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 6.5,
    stepStrokeCurrentColor: '#051367',
    separatorFinishedColor: '#051367',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#051367',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 14,
    currentStepLabelColor: '#051367',
    labelFontFamily:"TheJamsil5Bold",

};
const VerticalStepIndicator = ({ searchTerm,orderData}) => {
    const { t ,i18n} = useTranslation();

    // const [orderData, setOrderData] = useState(null);
    const [currentPage, setCurrentPage] = useState(3);
    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;


    useEffect(() => {
        // console.log('orderData', orderData);
        if (orderData) {
            const faConfirmFlag = orderData.faConfirmFlag;
            console.log(faConfirmFlag);
            if (faConfirmFlag === 'A') {
                setCurrentPage(0);
            } else if (faConfirmFlag === 'B' || faConfirmFlag === 'C') {
                setCurrentPage(1);
            } else if (faConfirmFlag === 'D') {
                setCurrentPage(2);
            } else if (faConfirmFlag === 'E') {
                setCurrentPage(3);
            } else if (faConfirmFlag === 'F')
            {
                setCurrentPage(4);

            }
        }
        console.log("use",currentPage);

    }, []);

    const dummyData = [
        {
            title: t('orderComplete'),
            body: 'creationDate',
        },
        {
            title: t('designPossiblePassPlant'),
            body: 'posbPassFacCdN',
        },
        {
            title: t('confirmPossiblePassPlant'),
        },
        {
            title: t('factoryDecision'),
            body: 'cfirmPassOpCd',
        },
        {
            title: t('manufacturingInput'),
        },
    ];
    const renderPage = ({ item, index }) => {
        const isCurrentPage = index === currentPage;
        const isEnglish = i18n.language === 'en';
        const fontSize = isCurrentPage ?(isEnglish ? 12 : 14) : 12;
        const textColor = isCurrentPage ? '#051367' : '#333333';
        const bodyText = item.body && orderData && orderData[item.body] !== null ? orderData[item.body] : '';

        return (
            <View style={styles.chartContainerOut}>
                <View style={styles.chartContainer}>
                    <View style={{...styles.rowItem,}}>
                        <Text style={{...styles.title, fontSize, color: textColor}}>
                            {item.title}
                        </Text>
                        {item.body && bodyText !== '' && (
                            <Text style={{...styles.body, fontSize, color: textColor}}>
                                {bodyText}
                            </Text>
                        )}
                    </View>

                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={5}
                    direction="vertical"
                    currentPosition={currentPage}
                    labels={dummyData.map((item) => item.title)}

                />
            </View>
            <FlatList
                style={{ flexGrow: 1 }}
                data={dummyData}
                renderItem={renderPage}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};
export default VerticalStepIndicator;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop:15,
        marginLeft:12,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    rowItem: {
        flex: 1,
        marginTop:10,
        // paddingVertical: 5,
    },
    title: {
        flex: 1,
        fontSize: 15,
        color: '#333333',
        paddingVertical: 5,

        fontFamily:"TheJamsil5Bold",
    },
    body: {
        flex: 1,
        fontSize: 13,
        color: '#606060',
        // marginTop: 5,
        marginRight: 8,
        fontFamily:"TheJamsil3Regular" ,
    },
    chartContainerOut: {
        width: 350,
        // paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 8,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,


    },
    chartContainer:{
        marginBottom: 15,
        marginLeft:4,

    },
});
