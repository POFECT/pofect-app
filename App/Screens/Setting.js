import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import UserSetting from "../Components/Setting/UserSetting";

import Icon from 'react-native-vector-icons/FontAwesome'
import AppVersion from "../Components/Setting/AppVersion";
const Stack = createStackNavigator();

// 상단 bar
const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>설정</Text>
                ),
                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                    </View>
                ),
                headerTintColor: 'black',
                headerLeft: () => null, // This will hide the back button

            }}
        />
        <Stack.Screen
            name="UserSetting"
            component={UserSetting}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>글씨 크기 설정</Text>
                ),
                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                    </View>
                ),
                headerTintColor: 'black',
            }}
        />

        <Stack.Screen
            name="AppVersion"
            component={AppVersion}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>앱 버전</Text>
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


const Setting = ({ navigation }) => {

    const goToSettings = () => {
        console.log('Navigate to App Settings');
    };

    const goToUserSetting = () => {
        navigation.navigate('UserSetting');
    };

    const goToAppVersion = () => {
        navigation.navigate('AppVersion');
    };

    const generalSettings = [
        { label: '글씨 크기 설정', onPress: goToUserSetting },
    ];

    const infoSettings = [
        // { label: '공지사항', /* onPress: Add your navigation logic here */ },
        { label: '앱 버전', onPress: goToAppVersion  },
    ];
    const userInformation = [
        { label: '계정명', value: 'pdxx001' },
        { label: '이메일', value: 'pdxx001@poscodx.com' },

    ];
    //로그아웃
    const handleLogout = () => {
        setTimeout(() => {
            navigation.navigate('Login');
        },1200)
    };
    const renderSettingItem = ({ item }) => (
        <TouchableOpacity
            style={styles.infoItem}
            onPress={item.onPress}
        >
            <Text style={styles.infoLabel}>{item.label}</Text>
            <View style={styles.rightArrowContainer}>
                <Icon name="angle-right" style={styles.rightArrow} />
            </View>
        </TouchableOpacity>
    );

    const renderUserInformationItem = ({ item }) => (
        <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{item.label}:</Text>
            <Text style={styles.userInformationValue}>{item.value}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.sectionTitle}>내 정보</Text>
                <FlatList
                    data={userInformation}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderUserInformationItem}
                />
                <TouchableOpacity
                    style={styles.infoItem}
                    onPress={handleLogout}
                >
                    <Text style={styles.logout}>로그아웃</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <Text style={styles.sectionTitle}>일반</Text>
                <FlatList
                    data={generalSettings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSettingItem}
                />
                <View style={styles.line} />

                <Text style={styles.sectionTitle}>정보</Text>
                <FlatList
                    data={infoSettings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSettingItem}
                />


            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10
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
