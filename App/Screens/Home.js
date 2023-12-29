import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {StatusBar} from "expo-status-bar";

export default function Home() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Tab 1' },
        { key: 'second', title: 'Tab 2' },
        { key: 'third', title: 'Tab 3' },
    ]);

    const renderScene = SceneMap({
        first: ()=>(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Order Number"
                    placeholderTextColor="#ecf0f1"
                />
                <Animated.View style={[styles.content, animatedStyle]}>
                    <Text style={styles.title}>Welcome to My Modern App</Text>
                    <Text style={styles.subtitle}>Explore and Enjoy the Experience!</Text>
                </Animated.View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => alert('Button Pressed!')}
                >
                    <Text style={styles.buttonText}>Click Me</Text>
                </TouchableOpacity>
            </View>
        ),
        second: ()=>(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Content for the second tab</Text>
            </View>
        ),
        third: ()=>(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Content for the third tab</Text>
            </View>
        ),
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#2ecc71' }}
        />
    );



    const opacity = useSharedValue(0);
    const translateY = useSharedValue(100);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000 });
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }, { scale: scale.value }],
        };
    });

    return (

        <View style={styles.container}>
            <StatusBar />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: 300 }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09537F',
        marginTop: StatusBar.currentHeight || 0,

    },
    content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#ecf0f1',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2ecc71',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});