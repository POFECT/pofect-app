import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFontSize } from "../../Components/Setting/fontProvider";

const UserSetting = () => {
    const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={{ fontSize, ...styles.title }}>글씨 크기 SAMPLE</Text>
                <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
                    <Text style={styles.buttonText}>UP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
                    <Text style={styles.buttonText}>DOWN</Text>
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
    title: {
        fontFamily: 'LINESeedKR-Bd',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#264c9a',
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

export default UserSetting;