import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//global
import { useTranslation } from 'react-i18next';
import i18n from '../../../locales/i18n';


const GlobalSetting = () => {


    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const {t,i18n} = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.maintitle}>{t('selectLanguage')}</Text>
                <Text style={styles.title}>{t('greeting')}</Text>
                <TouchableOpacity style={styles.button}  onPress={() => changeLanguage('en')} >
                    <Text style={styles.buttonText}>Switch to English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}  onPress={() => changeLanguage('ko')}>
                    <Text style={styles.buttonText}>한국어로 전환</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    card: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    maintitle: {
        fontFamily: 'LINESeedKR-Bd',
        marginBottom:  30,
        fontSize:16,
        textAlign: 'center',
        color: '#333',
    },
    title: {
        fontFamily: 'LINESeedKR-Bd',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#051367',
        padding: 10,
        borderRadius: 5,

        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'LINESeedKR-Bd',

    },
});

export default GlobalSetting;