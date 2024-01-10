import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import DonutChart from "../Components/DashBoard/DonutChart";
import GroupedBars from "../Components/DashBoard/GroupedBars";
const Stack = createStackNavigator();
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Size from "../Utils/Size";


// 상단 bar
const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Setting"
            component={Dashboard}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>DashBoard</Text>
                ),
                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                    </View>
                ),
                headerTintColor: 'black',
            }}
        />

    </Stack.Navigator>
);

const Dashboard = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselItems = [
        { title: 'Donut Chart', component: <DonutChart /> },
        { title: 'Grouped Bars', component: <GroupedBars /> },
        // Add more components as needed
    ];

    const renderItem = ({ item, index }) => (
        <View>
            {item.component}
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={Size.width}
                itemWidth={360}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <Pagination
                dotsLength={carouselItems.length}
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
    paginationContainer: {
        marginTop: 20,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#3498db',
    },
    inactiveDotStyle: {
        backgroundColor: '#bdc3c7',
    },
});

export default AppStack;