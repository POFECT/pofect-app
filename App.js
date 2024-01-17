import {StatusBar} from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { SafeAreaView,StyleSheet, Text, View } from 'react-native';
import Login from "./App/Screens/Login";
import Home from "./App/Screens/Home";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigation from "./App/Navigations/TabNavigation";

//font
import { useFonts } from 'expo-font';
import Size from "./App/Utils/Size";

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] =  useFonts({
        'TheJamsil1Thin': require('./assets/fonts/TheJamsil1Thin.ttf'),
        'TheJamsil2Light': require('./assets/fonts/TheJamsil2Light.ttf'),
        'TheJamsil3Regular': require('./assets/fonts/TheJamsil3Regular.ttf'),
        'TheJamsil4Medium': require('./assets/fonts/TheJamsil4Medium.ttf'),
        'TheJamsil5Bold': require('./assets/fonts/TheJamsil5Bold.ttf'),
        'TheJamsil6ExtraBold': require('./assets/fonts/TheJamsil6ExtraBold.ttf'),
        'LINESeedKR-Bd': require('./assets/fonts/LINESeedKR-Bd.ttf'),
        'LINESeedKR-Rg': require('./assets/fonts/LINESeedKR-Rg.ttf'),
        'LINESeedKR-Th': require('./assets/fonts/LINESeedKR-Th.ttf'),
    });
    if (!fontsLoaded) {
        // Font not loaded yet, return null or a loading indicator
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            {/*<NavigationContainer>*/}
            {/*    <Stack.Navigator*/}
            {/*        initialRouteName="Login"*/}
            {/*        screenOptions={{ headerShown: false }}>*/}
            {/*        <Stack.Screen name="Login">*/}
            {/*            {(props) => <Login {...props} />}*/}
            {/*        </Stack.Screen>*/}
            {/*        <Stack.Screen name="TabNavigation"*/}
            {/*                      component={TabNavigation} />*/}
            {/*    </Stack.Navigator>*/}
            {/*</NavigationContainer>*/}


            <NavigationContainer>
                <Stack.Navigator

                                 screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen
                        name="TabNavigation"
                        component={TabNavigation}
                        options={{
                            gestureEnabled: false,
                            gestureDirection: 'vertical',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // marginTop: StatusBar.currentHeight || 0,
        paddingTop: Constants.statusBarHeight,
        // padding: Size.width * 0.01,

    },
});
