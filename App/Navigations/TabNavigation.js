import React from 'react';
import { Text, StyleSheet} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Screens/Home';
import Setting from '../Screens/Setting';
import Dashboard from '../Screens/Dashboard'; // 대시보드 컴포넌트 import
import { FontAwesome5 } from '@expo/vector-icons';
import RecentSearch from "../Components/OrderSearch/RecentSearch";

//local
import { useTranslation } from 'react-i18next';



const Tab = createMaterialBottomTabNavigator();



export default function TabNavigation({route}) {

    const { t } = useTranslation();

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
            activeColor="#051367"
            inactiveColor="#757575"

            // labeled={false}

        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>{t('home')}</Text>
                    ,
                headerLeft: (props) => null,

                }}
            />

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chart-bar" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>Dashboard</Text>,
                    headerLeft: null,
                }}
            />

            <Tab.Screen
                name="RecentSearch"
                component={RecentSearch}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="search" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>{t('orderSearch')}</Text>

                }}
            />

            <Tab.Screen
                name="Setting"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-cog" size={20} color={color} />
                    ),
                    tabBarLabel: <Text style={styles.tabBarLabel}>{t('setting')}</Text>
                }}
            >
                {() => <Setting username={route.params?.username} />}
            </Tab.Screen>
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'TheJamsil5Bold',
    },
});
