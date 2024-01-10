// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     TouchableOpacity,
//     TouchableWithoutFeedback, Platform
// } from 'react-native';
// import { createStackNavigator } from "@react-navigation/stack";
// import UserSetting from "../Components/Setting/UserSetting";
// import Icon from 'react-native-vector-icons/FontAwesome'
// import {SceneMap, TabBar, TabView} from "react-native-tab-view";
// import OrderInfoComponent from "../Components/OrderSearch/OrderInfoComponent";
// import VerticalStepIndicator from "../Components/OrderSearch/ProgressStepComponent";
// import ProgressChartExample from "../Components/OrderSearch/ProgressChartExample";
// import {StatusBar} from "expo-status-bar";
// import {Ionicons} from "@expo/vector-icons";
// import Colors from "../Utils/Colors";
// import BasicInfoComponent from "../Components/OrderSearch/BasicInfoComponent";
// import Size from "../Utils/Size";
// const Stack = createStackNavigator();
//
// // 상단 bar
// const AppStack = () => (
//     <Stack.Navigator>
//         <Stack.Screen
//             name="Setting"
//             component={Dashboard}
//             options={{
//                 headerTitle: () => (
//                     <Text style={styles.headerTitle}>DashBoard</Text>
//                 ),
//                 headerTitleAlign: 'center',
//                 headerBackground: () => (
//                     <View style={styles.headerBackground}>
//                     </View>
//                 ),
//                 headerTintColor: 'black',
//             }}
//         />
//
//     </Stack.Navigator>
// );
//
//
//
// const Dashboard=() => {
//
//     const [index, setIndex] = React.useState(0);
//
//     const [routes] = React.useState([
//         { key: 'first', title: '주문 정보' },
//         { key: 'second', title: '진행 상태' },
//         { key: 'third', title: '재료 정보' },
//     ]);
//
//
//     const renderScene = SceneMap({
//         first: () => (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
//                 backgroundColor:'#fff'}}>
//
//             </View>
//         ),
//         second: () => (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
//                 backgroundColor:'#fff'}}>
//             </View>
//
//         ),
//         third: () => (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
//                 backgroundColor:'#fff', padding:10,}}>
//
//             </View>
//         ),
//     });
//
//     const renderTabBar = (props) => (
//         <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: '#0A5380' }}
//             style={{ backgroundColor: '#fff'}}
//             labelStyle={{ color: '#0A5380' ,
//                 fontFamily: "LINESeedKR-Bd",
//                 fontSize: 15,}}
//
//         />
//     );
//     return (
//         <View style={styles.container}>
//             <View style={styles.body}>
//                 <Text style={styles.sectionTitle}>내 정보</Text>
//             </View>
//             <TabView
//                 navigationState={{index, routes}}
//                 renderScene={renderScene}
//                 onIndexChange={setIndex}
//                 initialLayout={{width: 300}}
//                 renderTabBar={renderTabBar}
//             />
//
//
//         </View>
//     )
// }
//
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     headerBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderColor: 'white',
//     },
//     headerTitle: {
//         fontFamily: 'TheJamsil4Medium',
//         color: 'black',
//         fontSize: 18,
//     },
//     body: {
//         backgroundColor:"#fff",
//         flex: 1,
//         marginBottom: 1,
//     },
//     sectionTitle: {
//         padding: 20,
//         fontSize: 13,
//         fontFamily: 'TheJamsil5Bold',
//         marginBottom: 2,
//         backgroundColor:"#fff",
//         color: '#7D7D7D',
//     },
//     placeholderText: {
//         color: '#444444',
//         fontFamily:'LINESeedKR-Rg',
//         transform:[{ translateX: Size.width * 0.02},
//             {translateY: Size.height * 0.016 }],
//     },
//     placeholderText2: {
//         color: '#444444',
//         textAlign:"center",
//         fontFamily:'LINESeedKR-Rg',
//     },
//
//     BasicInfoTitle: {
//         color: '#0A5380' ,
//         fontFamily: "LINESeedKR-Bd",
//         fontSize: 15,
//         marginTop: 10,
//         marginLeft: 20
//
//     },
//     BasicInfoContainer: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 20,
//         marginBottom: 25,
//         marginHorizontal:12,
//
//         ...Platform.select({
//             ios: {
//                 shadowColor: "#000",
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 shadowOpacity: 0.23,
//                 shadowRadius: 2.62,
//
//             },
//             android: {
//                 elevation: 4,
//             },
//         })
//     },
//     thirdTap: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 20,
//         marginBottom: 25,
//         marginHorizontal:12,
//
//
//     },
//
// });
// export default AppStack;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import Size from "../../Utils/Size";

const data = [
    {
        title: 'Aenean leo',
        body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor...',
        imgUrl: 'https://picsum.photos/id/11/200/300',
    },
    {
        title: 'In turpis',
        body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere...',
        imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
        title: 'Lorem Ipsum',
        body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante...',
        imgUrl: 'https://picsum.photos/id/12/200/300',
    },
];

const CarouselExample = () => {
    const isCarousel = React.useRef(null);

    return (
        <View style={styles.container}>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
            { translateX: -Size.width * 0.33},
            { translateY: Size.height * 0.016 },
        ],
    },
});

export default CarouselExample;
