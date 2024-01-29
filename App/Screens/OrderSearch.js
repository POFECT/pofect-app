import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
    TouchableOpacity,
    FlatList,
    Button,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {StatusBar} from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import RecentSearch from "../Components/OrderSearch/RecentSearch";
import Size from "../Utils/Size";
import BasicInfoComponent from "../Components/OrderSearch/BasicInfoComponent";
import OrderInfoComponent from "../Components/OrderSearch/OrderInfoComponent";
import VerticalStepIndicator from "../Components/OrderSearch/ProgressStepComponent";
import MainApi from "../APIs/MainApi";
import ProgressChartExample from "../Components/OrderSearch/ProgressChartExample";
import {ALERT_TYPE, Dialog, AlertNotificationRoot,} from 'react-native-alert-notification';
import {useTranslation} from "react-i18next";

const Stack = createStackNavigator();


const OrderSearch = ({route}) => {

    const { t } = useTranslation();

    OrderSearch.navigationOptions = {
        headerLeft: () => null, // 왼쪽으로 뒤로가기 버튼 숨기기
    };

    const {searchTerm } = route.params || {};
    const [searchTermState, setSearchTerm] = useState(true);
    const [orderData, setOrderData] = useState(null);

    // const []

    //에러
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const showErrorModal = () => {
        setIsErrorModalVisible(true);
    };
    const handleNavigateToRecentSearch = () => {
        setIsErrorModalVisible(false);
        navigation.navigate('RecentSearch');
        setSearchTerm(false);

    };

    // console.log("주문번호 입력한거", searchTerm);

    useEffect(() => {
        setIndex(0);

        if (!searchTerm) {
            setIsErrorModalVisible(false);
        } else {
            MainApi.getOrderListByOrdNo(
                searchTerm,
                (data) => {
                    if (data.response) {
                        setOrderData(data.response);
                    }
                },
                () => {
                    // Error callback
                    setIsErrorModalVisible(true);
                    setSearchTerm(false);
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: '해당 주문 번호는 없는 번호입니다.',
                        textBody: '올바른 주문 번호를 입력해주세요.',
                        button: '돌아가기',
                        closeOnOverlayTap : false,
                        onPressButton: () => handleNavigateToRecentSearch(),
                    });
                }
            );
        }
    }, [route]);

    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([
            { key: 'first', title: t('orderSearchComponent.orderData') },
            { key: 'second', title: t('orderSearchComponent.status') },
            { key: 'third', title: t('orderSearchComponent.w') },
        ]);
    }, [t]);


    const renderScene = SceneMap({
        first: () => (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff'
            }}>
                {searchTerm ? (
                    <OrderInfoComponent searchTerm={searchTerm} orderData={orderData}/>
                ) : (
                    <>
                        <Text style={styles.placeholderText}>주문번호를 입력해주세요.</Text>
                    </>
                )}
            </View>
        ),
        second: () => (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff'
            }}>
                {searchTerm ? (
                    <VerticalStepIndicator searchTerm={searchTerm} orderData={orderData}/>
                ) : (
                    <>
                        <Text style={styles.placeholderText}>주문번호를 입력해주세요.</Text>
                    </>
                )}

            </View>

        ),
        third: () => (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff', padding: 10,
            }}>

                {searchTerm ? (
                    <View style={styles.BasicInfoContainer}>
                        <ProgressChartExample orderData={orderData}/>
                    </View>
                ) : (
                    <>
                        <Text style={styles.placeholderText}>주문번호를 입력해주세요.</Text>
                    </>
                )}
            </View>
        ),
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#051367'}}
            style={{backgroundColor: '#fff'}}
            labelStyle={{
                color: '#051367',
                fontFamily: "LINESeedKR-Bd",
                fontSize: 15,
            }}

        />
    );


    useEffect(() => {
        // This code will run only once during the initial render
        console.log('Component mounted, do something here');

        // Add your additional code that should run once here

    }, []);


    //검색창 이동
    const navigation = useNavigation();

    const navigateToRecentSearch = () => {
        navigation.navigate('RecentSearch');
    };

    // 기본 정보
    const data = orderData ? [
        { iconName: 'ios-business', title: t('orderSearchComponent.pohang'), description: t('category') },
        { iconName: 'analytics', title: orderData.osMainStatusCd, description: t('progress') },
        { iconName: 'pricetags', title: orderData.ordPdtItdsCdN, description: t('productName') }
    ] : [];

    console.log('isErrorModalVisible:', isErrorModalVisible);

    return (

        <View style={styles.container}>
            <StatusBar/>
            {/*Search*/}
            <View style={styles.searchContainer}>
                <TouchableWithoutFeedback onPress={navigateToRecentSearch}>
                    <View style={styles.searchInput}>
                        {searchTerm ? (
                            <Text style={styles.placeholderText}>{searchTerm}</Text>
                        ) : (
                            <>
                                <Text style={styles.placeholderText}>주문번호를 입력해주세요.</Text>
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                <Ionicons name="search-circle" size={40} color={Colors.PRIMARY}
                          style={{marginTop: -2.5, marginRight: 2}}/>
            </View>

            {/* BasicInfo */}
            {searchTerm && (
<>
                <Text style={styles.BasicInfoTitle}>{t('orderSearchComponent.basic')}</Text>
            <View style={styles.BasicInfoContainer}>
                {searchTerm ? (
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <BasicInfoComponent
                                // style={{marginLeft:39}}
                                iconName={item.iconName}
                                title={item.title}
                                description={item.description}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={{}}
                    />
                ) : (
                    <>
                        <Text style={styles.placeholderText2}>주문번호를 입력해주세요.</Text>
                    </>
                )}
            </View>

</>)}
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: 300}}
                renderTabBar={renderTabBar}
            />
            {/*{isErrorModalVisible && (*/}
            {/*    <View style={styles.fullScreenOverlay}>*/}
            {/*        <ErrorModal onClose={() => setIsErrorModalVisible(false)} onNavigateToRecentSearch={handleNavigateToRecentSearch} />*/}
            {/*    </View>*/}
            {/*)}*/}
            {isErrorModalVisible && (
                <View style={styles.fullScreenOverlay} pointerEvents="box-only">
                    <AlertNotificationRoot
                        theme= 'light'
                    onClose={() => setIsErrorModalVisible(false)}
                    ></AlertNotificationRoot>
                </View>
            )}

        </View>
    );
};


export default OrderSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,

    },

    searchContainer: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 5,
        borderRadius: 99,
        marginTop: 14,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },
    searchInput: {
        height: 38,
        width: "86%",
        backgroundColor: '#EBECEC',
        // borderColor: 'white',
        // borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    placeholderText: {
        color: '#444444',
        fontFamily: 'LINESeedKR-Rg',
        transform: [{translateX: Size.width * 0.02},
            {translateY: Size.height * 0.012}],
    },
    placeholderText2: {
        color: '#444444',
        textAlign: "center",
        fontFamily: 'LINESeedKR-Rg',
    },
    headerBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
    },
    headerTitle: {
        fontFamily: 'TheJamsil4Medium',
        color: 'black',
        fontSize: 18,
    },

    BasicInfoTitle: {
        color: '#0A5380',
        fontFamily: "LINESeedKR-Bd",
        fontSize: 15,
        marginTop: 10,
        marginLeft: 20

    },
    BasicInfoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 25,
        marginLeft:20,
        marginHorizontal: 18,

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
    },

    thirdTap: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 25,
        marginHorizontal: 12,


    },
    fullScreenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgb(255,255,255)', // Adjust the opacity/color as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontFamily: 'LINESeedKR-Bd', // Replace with your font family
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: '#0A5380',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'YourFontFamily', // Replace with your font family
        textAlign: 'center',
    },
});
