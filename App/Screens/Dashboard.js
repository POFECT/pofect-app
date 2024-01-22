import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Size from '../Utils/Size';
import DonutChart from '../Components/DashBoard/DonutChart';
import GroupedBars from '../Components/DashBoard/GroupedBars';
import BarChart from "../Components/DashBoard/BarChartDash";
import MainApi from "../APIs/MainApi";

const Stack = createStackNavigator();

const AppStack = () => (
    <Stack.Navigator >
        <Stack.Screen

            name="DashBoard"
            component={Dashboard}
            options={{
                headerTitle: () => <Text style={styles.headerTitle}>DashBoard</Text>,
                headerTitleAlign: 'center',
                headerBackground: () => <View style={styles.headerBackground} />,
                headerTintColor: 'black',
                headerLeft: () => null,

            }}
        />
    </Stack.Navigator>
);



const Dashboard = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderItem = ({ item }) => <View>{item.component}</View>;
    const [orderList, setOrderList] = useState({
        list: [],
        order: null,
    });
    const [cntList, setCntList] = useState([]);

    //재렌더링
    const MemoizedChartComponent = React.memo(GroupedBars);
    const MemoizedDonutChartComponent = React.memo(DonutChart);
    const MemoizedBarChartComponent = React.memo(BarChart);

    const components = [
        {id: 'donut', component: <MemoizedDonutChartComponent cntList={cntList} />  },
        { id: 'groupedBars', component: <MemoizedChartComponent /> },
        { id: 'barchart', component: <MemoizedBarChartComponent /> },
    ];
    // console.log("*****",cntList)

    const getOrders = () => {
        MainApi.getOrderList(null, "20240130", "H", null, (data) => {
            const list = data.response;

            const countByFlag = {};
            const possibleFlags = ['A', 'B', 'C', 'D', 'E', 'F'];

            // Initialize counts to 0 for each flag
            possibleFlags.forEach(flag => {
                countByFlag[flag] = 0;
            });

            // Count occurrences for each flag
            list.forEach(item => {
                const flag = item.faConfirmFlag;
                // Group "B" and "C" counts together
                if (flag === 'B' || flag === 'C') {
                    countByFlag['B'] += 1;
                } else {
                    countByFlag[flag] += 1;
                }
            });

            // Map the counts to the cntList array
            setCntList(['A', 'B', 'D', 'E', 'F'].map(flag => countByFlag[flag]));
        });
    };

    useEffect(() => {
        getOrders();
    }, []);


        return (
        <View style={styles.container}>
            <Carousel
                data={components}
                renderItem={renderItem}
                sliderWidth={Size.width}
                itemWidth={360}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <Pagination
                dotsLength={components.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.8}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
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
    paginationContainer: {
        marginTop: 20,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#051367',
    },
    inactiveDotStyle: {
        backgroundColor: '#bdc3c7',
    },
});

export default AppStack;