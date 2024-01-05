import React, {useState, useCallback, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ProgressChartExample from "./ProgressChartExample";
import MainApi from "../../APIs/MainApi";

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#005584',
    separatorFinishedColor: '#005584',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#005584',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 14,
    currentStepLabelColor: '#005584',
    labelFontFamily:"TheJamsil5Bold",

};
const VerticalStepIndicator = ({ searchTerm }) => {
    const [orderData, setOrderData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;

    useEffect(() => {
        console.log('searchTerm', searchTerm);

        MainApi.getOrderListByOrdNo(searchTerm, (data) => {
            setOrderData(data.response);
            if (data.response) {
                const faConfirmFlag = data.response.faConfirmFlag;
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
        });
        console.log("use",currentPage);

    }, [searchTerm]);

    const dummyData = [
        {
            title: '주문 완료',
            body: 'creationDate',
        },
        {
            title: '가능통과공장 설계',
            body: 'posbPassFacCdN',
        },
        {
            title: '가능통과공장 확정',
        },
        {
            title: '공장 결정',
            body: 'cfirmPassOpCd',
        },
        {
            title: '제조 투입',
        },
    ];


    useEffect(() => {
        console.log('currentPage:', currentPage);
    }, [currentPage]);


    const renderPage = ({ item, index }) => {
        const isCurrentPage = index === currentPage;
        const fontSize = isCurrentPage ? 14 : 12;
        const textColor = isCurrentPage ? '#005584' : '#333333';
        const bodyText = item.body && orderData && orderData[item.body] !== null ? orderData[item.body] : '';

        return (
            <View style={{ ...styles.rowItem, }}>
                <Text style={{ ...styles.title, fontSize, color: textColor }}>
                    {item.title}
                </Text>
                {item.body && bodyText !== '' && (
                    <Text style={{ ...styles.body, fontSize, color: textColor }}>
                        {bodyText}
                    </Text>
                )}
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

        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 20,

        paddingHorizontal: 20,
    },
    rowItem: {
        flex: 3,
        marginTop:10,
        paddingVertical: 5,
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
});
