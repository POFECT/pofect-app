import {View, Text, StyleSheet, Platform} from 'react-native'
import React, { useRef,useEffect,useState } from 'react';
import { Video } from 'expo-av';
import appVideo from '../../../assets/videos/video.mp4';
import Size from "../../Utils/Size";
import Colors from "../../Utils/Colors";
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import MainApi from '../../APIs/MainApi';

export default function HomeVideo() {

    const videoRef = useRef(null);
    const [cntList, setCntList] = useState([0, 0, 0, 0, 0,0]);

    const handleVideoReady = async () => {
        try {
            if (videoRef.current) {
                await videoRef.current.playAsync();
            }
        } catch (error) {
            console.error('비디오 재생 중 오류:', error);
        }
    };
    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        MainApi.getOrderList(null, "20240130", "H", null, (data) => {
            const list = data.response;
            const countByFlag = {};
            const possibleFlags = ['A', 'B', 'C', 'D', 'E', 'F'];
            possibleFlags.forEach(flag => {
                countByFlag[flag] = 0;
            });

            list.forEach(item => {
                const flag = item.faConfirmFlag;
                countByFlag[flag]++;
            });
            setCntList(['A', 'B','C', 'D', 'E', 'F'].map(flag => countByFlag[flag]));
        });
    };

    //Text Animation
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(50);

    useFocusEffect(
        React.useCallback(() => {
            // 화면 focus -> 애니메이션
            opacity.value = withTiming(1, { duration: 1500 });
            translateY.value = withSpring(0);
            return () => {
                // 화면 focus out -> 애니메이션
                opacity.value = withTiming(0);
                translateY.value = withSpring(50);
            };
        }, [])
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value -28},
                { translateY: translateY.value +50}],
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value+ 75 },
                { translateY: translateY.value +140}],
        };
    });
    return (
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
                rate={0.7}
            />
            <Animated.Text style={[styles.text, animatedStyle]}>20240130 </Animated.Text>
            <Text style={styles.semiText}>출강주</Text>
            <Animated.Text style={[styles.secondText, animatedStyle2]}>
                {`가통 정상 설계 : ${cntList[1]}건\n에러 주문 : ${cntList[2]}건\n공장 결정 대상 : ${cntList[4]}건`}
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({

    videoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'contain',
        overflow: 'hidden',
        borderRadius: Size.width * 0.6,
        width: '160%',
        height: Size.height * 0.55,
        transform: 'translateY(-' + Size.height * 0.13 + 'px)',

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
    video: {
        objectFit: 'contain',
        overflow: 'hidden',
        width: '160%',
        height: Size.height * 0.55,
    },

    text: {
        textAlign: 'center',
        fontSize: Size.width * 0.14,
        color: Colors.WHITE,
        fontFamily: 'TheJamsil6ExtraBold',
        marginBottom:-10,
        position: 'absolute',
        transform: [{ translateX: -Size.width * 0.08},
                    {translateY: Size.height * 0.06}],

    },
    semiText: {
        textAlign: 'center',
        fontSize: Size.width * 0.05,
        color: Colors.WHITE,
        fontFamily: 'LINESeedKR-Bd',
        // marginTop: Size.height * 0.31,  // 수정된 부분
        position: 'absolute',
        transform:[{ translateX: -Size.width * 0.36},
                     {translateY: Size.height * 0.0055 }],
    },
    secondText: {
        textAlign: 'right',
        fontSize: Size.width * 0.05,
        color: Colors.WHITE,
        fontFamily: 'LINESeedKR-Bd',
        // marginTop: Size.height * 0.3,  // 수정된 부분
        position: 'absolute',
        transform : [{ translateX: Size.width * 0.23}, //0.21
                {translateY: Size.height * 0.16 }],
    },
});