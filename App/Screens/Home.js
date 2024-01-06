import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import HomeVideo from "../Components/Home/HomeVideo";
import MainApi from "../APIs/MainApi";
import ChartComponent from "../Components/Home/BarChart";

const Home = () => {

    // ordList
    const [ordList, setOrdList] = useState([]);

    // // 출강주
    // const [weekList, setWeekList] = useState({
    //     list: [],
    //     select: "",
    // });

    // setWeekList("20230721");
    useEffect(() => {
        MainApi.getOrdCnt( (data) => {
            setOrdList(data.response);
        });
        console.log("ordList", ordList)
    }, []);


    //Text Animation
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    useFocusEffect(
        React.useCallback(() => {
            // 화면 focus -> 애니메이션
            opacity.value = withTiming(1, { duration: 1000 });
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
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View style={styles.container}>
            <HomeVideo />
            {/*<Animated.View style={[styles.header, animatedStyle]}>*/}
            {/*    <Text style={styles.headerText}>Welcome to My App</Text>*/}
            {/*</Animated.View>*/}

            {/*/!* 중앙 버튼 *!/*/}
            {/*<TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed!')}>*/}
            {/*    <Text style={styles.buttonText}>Explore Now</Text>*/}
            {/*</TouchableOpacity>*/}
            {/* 하단 컨텐츠 */}
            <View style={styles.contentContainer}>
                <ChartComponent ordList={ordList} />

                {/*<Text style={styles.contentTitle}>Featured Products</Text>*/}
                {/*{capacity.map((item) => (*/}
                {/*    <View key={item.id}>*/}
                {/*        /!*<Text style={styles.contentText}>Capacity: {item.faAdjustmentWgt}</Text>*!/*/}
                {/*        /!* 다른 정보들도 필요에 따라 추가 *!/*/}
                {/*    </View>*/}
                {/*))}*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8FA',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'blue',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',

        fontSize: 18,
    },
    contentContainer: {
        paddingBottom: 20,
        marginTop: -40,

    },
    contentTitle: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default Home;
