import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ALERT_TYPE, Dialog,AlertNotificationRoot } from 'react-native-alert-notification';
import UserSetting from "./UserSetting";

const Test= () =>{
    useEffect(() => {
        // Check for a new version and show an alert if needed
        const isNewVersionAvailable = true; // Replace with your logic to check for a new version
        if (isNewVersionAvailable) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'New Version Available',
                textBody: 'A new version of the app is available. Please update for the latest features and improvements.',
                button: 'Update',
                onPressButton: () => {
                    // Add logic to navigate to the app store or download page
                    // Example: Linking.openURL('your_download_link_here');
                },
            });
        }
    }, []);

    return (
        <View style={styles.container}>

            <AlertNotificationRoot />
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
        textAlign: 'center',
        color: '#333',
    },
    version: {
        fontSize: 14,
        fontFamily: 'LINESeedKR-Rg',
        textAlign: 'center',
        color: '#666',
    },
});

export default Test;