import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Screens/Home';
import Appointment from '../Screens/Appointment';
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
                backgroundColor: 'transparent',
                // borderTopWidth: 0, // 상단 테두리 제거
                // elevation: 0, // Android 그림자 제거
            }}
            activeColor="#09537F"
            inactiveColor="#757575"
            labeled={false}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chart-bar" size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Calendar"
                component={Appointment}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="calendar-alt" size={24} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-cog" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
