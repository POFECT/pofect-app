import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import UserSetting from "../Components/Setting/UserSetting";
import { useRoute } from '@react-navigation/native'; // Import useRoute hook

import Icon from 'react-native-vector-icons/FontAwesome'
import AppVersion from "../Components/Setting/AppVersion";
import GlobalSetting from "../Components/Setting/GlobalSetting";
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();


// 상단 bar
const AppStack = ({username}) => {
    const { t } = useTranslation();

    const Setting = ({ navigation,}) => {

        // const  username  = route.params;

        const goToSettings = () => {
            console.log('Navigate to App Settings');
        };

        const goToUserSetting = () => {
            navigation.navigate('UserSetting');
        };
        const goToGlobalSetting = () => {
            navigation.navigate('GlobalSetting');
        };

        const goToAppVersion = () => {
            navigation.navigate('AppVersion');
        };

        const generalSettings = [
            { label: t('settingComponent.title'), onPress: goToUserSetting },
            { label: t('settingComponent.global'), onPress: goToGlobalSetting },
        ];

        const infoSettings = [
            { label: t('settingComponent.version'), onPress: goToAppVersion  },
        ];

        const userInformation = [
            { label: t('settingComponent.account'), value: username },
            { label: t('settingComponent.email'), value: `${username}@poscodx.com` }
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
                    <Text style={styles.sectionTitle}>{t('settingComponent.my')}</Text>
                    <FlatList
                        data={userInformation}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderUserInformationItem}
                    />
                    <TouchableOpacity
                        style={styles.infoItem}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logout}>{t('settingComponent.logout')}</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <Text style={styles.sectionTitle}>{t('settingComponent.basic')}</Text>
                    <FlatList
                        data={generalSettings}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSettingItem}
                    />
                    <View style={styles.line} />

                    <Text style={styles.sectionTitle}>{t('settingComponent.info')}</Text>
                    <FlatList
                        data={infoSettings}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSettingItem}
                    />


                </View>
            </View>
        );
    };


    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={Setting}
                options={{
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>{t('setting')}</Text>
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
                        <Text style={styles.headerTitle}>{t('settingComponent.title')}</Text>
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
                name="GlobalSetting"
                component={GlobalSetting}
                options={{
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>{t('settingComponent.global')}</Text>
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
                        <Text style={styles.headerTitle}>{t('settingComponent.version')}</Text>
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
}




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
        width: 200,
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
