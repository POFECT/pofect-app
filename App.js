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

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] =  useFonts({
      'Inter-Black': require('./assets/fonts/TheJamsil5Bold.ttf'),
      'Extra-Black': require('./assets/fonts/TheJamsil6ExtraBold.ttf'),
      'Regular-Black': require('./assets/fonts/TheJamsil3Regular.ttf'),
      'Light-Black': require('./assets/fonts/TheJamsil2Light.ttf'),
    });
    if (!fontsLoaded) {
        // Font not loaded yet, return null or a loading indicator
        return null;
    }

  return (
      <SafeAreaView style={styles.container}>
          <StatusBar />
          <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{ headerShown: false }}
              >
                  <Stack.Screen name="Login">
                      {(props) => <Login {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="TabNavigation" component={TabNavigation} />
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

  },
});
