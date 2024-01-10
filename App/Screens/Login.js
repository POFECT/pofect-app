import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView,KeyboardAvoidingView,View, Text, StyleSheet, TextInput, TouchableOpacity, Platform  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import Size from '../Utils/Size';

import GradientText from './GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import MaskedView from "@react-native-masked-view/masked-view";
import LoginVideo from "../Components/Login/LoginVideo";

export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        // 로그인 처리
        console.log('Login Pressed');
        console.log('Username:', username);
        console.log('Password:', password);

        // 실제 로그인 처리
        // const response = await api.post('/login', { username, password });
        // const data = response.data;

        const loginSuccess = true;
        if (loginSuccess) {
            navigation.navigate('TabNavigation');
        } else {
            console.log('Login failed');
        }

    };

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.container}>
          <LoginVideo />
            <View style={styles.shadow}>
                {/*<View style={styles.contentBox}>*/}
                    <GradientText text="Experience the Factory Decision System on your mobile device for an efficient workflow" style={styles.semiText} />
                    {/*<MaskedView maskElement={ <Text style ={[styles.semiText, {backgroundColor:'transparent'} ]}>"abc"</Text>*/}
                    {/*}>*/}
                    {/*    <LinearGradient*/}
                    {/*        start={{ x: 0, y: 0 }}*/}
                    {/*        end={{ x: 1, y: 1 }}*/}
                    {/*        colors={['#a04b95','#7442B9', '#3F5486']}*/}
                    {/*    >*/}
                    {/*        <Text style ={[styles.semiText,{opacity:0} ]}>"abc"</Text>*/}

                    {/*    </LinearGradient>*/}
                    {/*</MaskedView>*/}
                    {/* 로그인 폼 */}
                    <View style={styles.loginForm}>
                        <View style={styles.inputContainer}>
                            <Feather name="user" size={24} color={Colors.PRIMARY} style={styles.icon} />
                            <TextInput
                                placeholder="Username"
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={24} color={Colors.PRIMARY} style={styles.icon} />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <TouchableOpacity  onPress={handleLogin}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#a04b95','#7442B9', '#3F5486']}
                            style={styles.loginButton}
                        >

                            <Text style={styles.loginButtonText}>Login</Text>
                        </LinearGradient>
                        </TouchableOpacity>

                    </View>
                {/*</View>*/}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom:10
    },

    shadow: {
        backgroundColor: Colors.WHITE,
        width: Size.width * 0.85,
        marginTop: -Size. height * 0.05,
        // height: Size.height  * 0.3,
        transform: `translateY(${-Size.height * 0.1}px)`, // Your other transformations go here
        padding: 35,
        borderRadius: Size.width * 0.1,
        overflow: 'hidden',
        alignItems: 'center',

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

            },
            android: {
                elevation: 8,
            },
        })
    },

    semiText: {
        textAlign: 'center',
        fontSize: Size.width * 0.035,
        marginTop: 3,
        marginBottom: Size.width * 0.1,
        color: Colors.PRIMARY,
        fontFamily: 'TheJamsil3Regular',
    },
    loginForm: {
        // marginTop: Size.height * 0.05,
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.PRIMARY,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        fontSize: 12,
        color: Colors.PRIMARY,
        flex: 1,
        fontFamily: 'TheJamsil2Light',
    },
    loginButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: 'TheJamsil4Medium',
    },
});
