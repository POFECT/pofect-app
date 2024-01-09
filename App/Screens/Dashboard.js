import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import UserSetting from "../Components/Setting/UserSetting";
import Icon from 'react-native-vector-icons/FontAwesome'
import CarouselExample from "../Components/DashBoard/SwiperComponent";
const Stack = createStackNavigator();

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

const Dashboard=() => {
    return (
        <View style={styles.container}>
                <CarouselExample />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    body: {
        backgroundColor:"#fff",
        flex: 1,
        marginBottom: 1,
    },
    sectionTitle: {
        padding: 20,
        fontSize: 13,
        fontFamily: 'TheJamsil5Bold',
        marginBottom: 2,
        backgroundColor:"#fff",
        color: '#7D7D7D',
    },
    infoItem: {
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingVertical: 10,
    },
    rightArrowContainer: {
        justifyContent: 'center',
    },
    rightArrow: {
        alignItems: 'center',
        fontSize: 20,
        color: '#7D7D7D',
    },
    infoLabel: {
        backgroundColor:"#fff",
        fontSize: 14,
        width: 100,
        fontFamily: 'TheJamsil3Regular',
        color: '#2c3e50',
    },

    logout: {
        backgroundColor:"#fff",
        fontSize: 14,
        width: 100,
        fontFamily: 'TheJamsil3Regular',
        color: 'red',
        alignSelf: 'flex-end',
    },
    line: {
        borderBottomWidth: 7,
        borderColor: '#F0F0F0',
        marginVertical: 3,
    },

});
export default AppStack;