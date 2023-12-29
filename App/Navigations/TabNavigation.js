import React from 'react';
import { Text, StyleSheet} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Screens/Home';
import OrderSearch from "../Screens/OrderSearch";
import Profile from '../Screens/Profile';
import Dashboard from '../Screens/Dashboard'; // 대시보드 컴포넌트 import
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            barStyle={{
                backgroundColor: 'white',
                // borderTopWidth: 1, // 상단 테두리 제거
                elevation:3,
                borderRadius:2,

            }}
            activeColor="#09537F"
            inactiveColor="#757575"
            labelStyle= {{
            fontSize: 10,
            fontFamily:'Inter-Black',
           }}
            // labeled={false}

        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>
,
                }}
            />

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chart-bar" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>Dashboard</Text>

                }}
            />

            <Tab.Screen
                name="OrderSearchTab"
                component={OrderSearch}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="search" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>OrderSearch</Text>

                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-cog" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>

                }}
            />
        </Tab.Navigator>

    );
}


const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Inter-Black',
        fontWeight: 'bold',
    },
});
