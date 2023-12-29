import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView,View, Text, StyleSheet, TextInput, TouchableOpacity, Platform  } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';

import { Shadow } from 'react-native-shadow-2';

import appVideo from '../../assets/videos/device-video.mp4';
import Colors from '../Utils/Colors';
import Size from '../Utils/Size';

import GradientText from './GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import MaskedView from "@react-native-masked-view/masked-view";

export default function Login({navigation}) {

    const videoRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleVideoReady = async () => {
        try {
            if (videoRef.current) {
                await videoRef.current.playAsync();
            }
        } catch (error) {
            console.error('비디오 재생 중 오류:', error);
        }
    };

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
        <SafeAreaView style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    source={appVideo}
                    style={styles.video}
                    shouldPlay
                    isLooping
                    resizeMode="contain"
                    onReadyForDisplay={handleVideoReady}
                    isMuted={true}
                    rate={0.6}
                />
                <Text style={styles.text}>POFECT</Text>
                <Text style={styles.secondText}>Factory Decision System</Text>

            </View>
            <Shadow style={styles.shadow}>
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
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#a04b95','#7442B9', '#3F5486']}
                            style={styles.loginButton}
                        >
                        <TouchableOpacity  onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                {/*</View>*/}
            </Shadow>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    videoContainer: {
        objectFit:'contain',
        overflow: 'hidden',
        // borderRadius: Size.width *1,
        width: '160%',
        // height: Size.height * 0.7,
        position: 'relative',

    },
    video: {
        objectFit:'contain',
        overflow: 'hidden',
        width: '160%',
        // marginTop:-Size.height * 0.05,
        height: Size.height * 0.7,
        // borderRadius: Size.width,
    },
    shadow: {
            backgroundColor: Colors.WHITE,

        width: Size.width * 0.85,
        marginTop: -Size. height * 0.1,
        // height: Size.height  * 0.3,
        transform: [{ translateY: -Size.height*0.06 }],
        padding: 35,
        borderRadius: Size.width * 0.1,
        overflow: 'hidden',
        alignItems: 'center',

        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

            },
            android: {
                elevation: 5,
            },
        })
    },
    // contentBox: {
    //     backgroundColor: Colors.WHITE,
    //     width: Size.width * 0.85,
    //     marginTop: -Size. height * 0.1,
    //     // height: Size.height  * 0.3,
    //     transform: [{ translateY: -Size.height*0.06 }],
    //
    //     padding: 35,
    //     borderRadius: Size.width * 0.1,
    //     overflow: 'hidden',
    //     alignItems: 'center',
    // },
    text: {
        textAlign: 'center',
        fontSize: Size.width * 0.17,
        color: Colors.WHITE,
        fontFamily: 'Extra-Black',
        // marginTop: 10,
        position: 'absolute',
        transform: [{ translateX: Size.width*0.35 }, { translateY: Size.height*0.3 }],
    },
    secondText: {
        textAlign: 'center',
        fontSize: Size.width * 0.065,
        color: Colors.WHITE,
        fontFamily: 'Extra-Black',
        marginTop: 10,
        position: 'absolute',
        transform: [{ translateX: Size.width*0.36 }, { translateY: Size.height*0.37 }],
    },
    semiText: {
        textAlign: 'center',
        fontSize: Size.width * 0.035,
        marginTop: 5,
        marginBottom: Size.width * 0.1,
        color: Colors.PRIMARY,
        fontFamily: 'Regular-Black',
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
        fontSize: 15,
        color: Colors.PRIMARY,
        flex: 1,
        fontFamily: 'Light-Black',
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
        fontSize: 18,
        fontFamily: 'Inter-Black',
    },
});
