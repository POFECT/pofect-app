import {View, Text, StyleSheet} from 'react-native'
import React, { useRef, } from 'react';
import { Video } from 'expo-av';
import appVideo from '../../../assets/videos/device-video.mp4';
import Size from "../../Utils/Size";
import Colors from "../../Utils/Colors";

export default function LoginVideo() {


    const videoRef = useRef(null);

    const handleVideoReady = async () => {
        try {
            if (videoRef.current) {
                await videoRef.current.playAsync();
            }
        } catch (error) {
            console.error('비디오 재생 중 오류:', error);
        }
    };

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
                rate={0.6}
            />
            <Text style={styles.text}>POFECT</Text>
            <Text style={styles.secondText}>Factory Decision System</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    videoContainer: {

        objectFit: 'contain',
        overflow: 'hidden',
        // borderRadius: Size.width *1,
        width: '160%',
        // height: Size.height * 0.7,
        position: 'relative',
    },
    video: {
        objectFit: 'contain',
        overflow: 'hidden',
        width: '160%',
        // marginTop:-Size.height * 0.05,
        height: Size.height * 0.7,
        // borderRadius: Size.width,
    },
    text: {
        textAlign: 'center',
        fontSize: Size.width * 0.17,
        color: Colors.WHITE,
        fontFamily: 'TheJamsil6ExtraBold',
        // marginTop: 10,
        position: 'absolute',
        transform: [{ translateX: Size.width*0.35 }, { translateY: Size.height*0.4 }],
    },
    secondText: {
        textAlign: 'center',
        fontSize: Size.width * 0.065,
        color: Colors.WHITE,
        fontFamily: 'TheJamsil5Bold',
        marginTop: 10,
        position: 'absolute',
        transform: [{ translateX: Size.width*0.36 }, { translateY: Size.height*0.47 }],
    },
});