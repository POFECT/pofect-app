import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    Platform,
    FlatList,
} from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecentSearch from "../Components/OrderSearch/RecentSearch";
import Size from "../Utils/Size";
import BasicInfoComponent from "../Components/OrderSearch/BasicInfoComponent";
import OrderInfoComponent from "../Components/OrderSearch/OrderInfoComponent";
import VerticalStepIndicator from "../Components/OrderSearch/ProgressStepComponent";
import MainApi from "../APIs/MainApi";
import ProgressChartExample from "../Components/OrderSearch/ProgressChartExample";

const Stack = createStackNavigator();

// 상단 bar
const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="OrderSearch"
            component={OrderSearch}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>주문 상세 조회</Text>
                ),                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                    </View>
                ),
                headerTintColor: 'black',
            }}
        />
        <Stack.Screen
            name="RecentSearch"
            component={RecentSearch}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>주문 번호 검색</Text>
                ),                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                    </View>
                ),
                headerTintColor: 'black',
            }}
        />
    </Stack.Navigator>
);

const OrderSearch = ({ route }) => {
    const { searchTerm } = route.params || {};
    const [orderData, setOrderData] = useState(null);

    console.log("주문번호 입력한거", searchTerm);

    useEffect(() => {
        setIndex(0);
        MainApi.getOrderListByOrdNo(searchTerm, (data) => {
            setOrderData(data.response);
        })

    }, [searchTerm]);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '주문 정보' },
        { key: 'second', title: '진행 상태' },
        { key: 'third', title: '재료 정보' },
    ]);


    const renderScene = SceneMap({
        first: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
                            backgroundColor:'#fff'}}>
                {searchTerm ? (
                        <OrderInfoComponent searchTerm={searchTerm} orderData={orderData} />
                ) : (
                    <>
                        <Text style={styles.placeholderText}>주문번호를 입력해주세요.</Text>
                    </>
                )}
            </View>
        ),
        second: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
                            backgroundColor:'#fff'}}>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor:'#fff', padding:10,}}>

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
            indicatorStyle={{ backgroundColor: '#0A5380' }}
            style={{ backgroundColor: '#fff'}}
            labelStyle={{ color: '#0A5380' ,
                            fontFamily: "LINESeedKR-Bd",
                            fontSize: 15,}}

        />
    );

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(100);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000 });
        translateY.value = withSpring(0);
        scale.value = withSpring(1);

    }, []);


    //검색창 이동
    const navigation = useNavigation();

    const navigateToRecentSearch = () => {
        navigation.navigate('RecentSearch');
    };

    // 기본 정보
    const data = orderData ? [
        { iconName: 'ios-business', title: '포항', description: '구분' },
        { iconName: 'analytics', title: orderData.osMainStatusCd, description: '진도' },
        { iconName: 'pricetags', title: orderData.ordPdtItdsCdN, description: '품명' },
    ] : [];


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
            <Text style={styles.BasicInfoTitle}>기본 정보</Text>
            <View style={styles.BasicInfoContainer}>
                {searchTerm ? (
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <BasicInfoComponent
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


            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: 300}}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};


export default AppStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop : 10,

    },

    searchContainer: {
        backgroundColor:'white',
        paddingLeft:15,
        paddingRight:5,
        borderRadius:99,
        marginTop:14,
        display:'flex',flexDirection:'row',justifyContent:'space-between'
    },
    searchInput: {
        height: 38,
        width: "86%",
        backgroundColor:'#EBECEC',
        // borderColor: 'white',
        // borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    placeholderText: {
        color: '#444444',
        fontFamily:'LINESeedKR-Rg',
        transform:[{ translateX: Size.width * 0.02},
            {translateY: Size.height * 0.012 }],
    },
    placeholderText2: {
        color: '#444444',
        textAlign:"center",
        fontFamily:'LINESeedKR-Rg',
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
        color: '#0A5380' ,
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
        marginHorizontal:18,

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
        marginHorizontal:12,


    },

});
