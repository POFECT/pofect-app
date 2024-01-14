import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppVersion() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>App Version</Text>
                <Text style={styles.version}>1.0.0</Text>
            </View>
        </View>
    );
}

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
        fontSize: 18,
        fontFamily: 'LINESeedKR-Bd',
        marginBottom: 10,
        textAlign:'center',
        color: '#333',
    },
    version: {
        fontSize: 14,
        fontFamily:'LINESeedKR-Rg',
        textAlign:'center',

        color: '#666',
    },
});
