import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeVideo from "../Components/Home/HomeVideo";
import MainApi from "../APIs/MainApi";
import ChartComponent from "../Components/Home/BarChart";
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const MemoizedChartComponent = React.memo(ChartComponent);

    // ordList
    const [ordList, setOrdList] = useState([]);

    // // 출강주
    // const [weekList, setWeekList] = useState({
    //     list: [],
    //     select: "",
    // });
    // setWeekList("20230721");
    const fetchData = () => {
        MainApi.getOrdCnt((data) => {
            setOrdList(data.response);
        });
        console.log("ordList", ordList);
    };

    // Fetch data when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    return (
        <View style={styles.container}>
            <HomeVideo />
            <View style={styles.contentContainer}>
                <MemoizedChartComponent ordList={ordList}/>

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


    contentContainer: {

        paddingBottom: 80,
        marginTop: -60,

    },

});

export default Home;
