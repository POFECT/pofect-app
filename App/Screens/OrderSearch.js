import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

const Stack = createStackNavigator();

// 상단 bar
const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="OrderSearch"
            component={OrderSearch}
            options={{
                headerTitle: () => (
                    <Text style={styles.headerTitle}>주문 상세 조회</Text>
                ),                headerTitleAlign: 'center',
                headerBackground: () => (
                    <View style={styles.headerBackground}>
                        {/*<Image*/}
                        {/*    style={styles.headerImage}*/}
                        {/*    source={require('./path-to-your-image.jpg')}*/}
                        {/*/>*/}
                    </View>
                ),
                headerTintColor: 'black',
            }}
        />
    </Stack.Navigator>
);

const OrderSearch = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '주문 정보' },
        { key: 'second', title: '진행 상태' },
        { key: 'third', title: '재료 정보' },
    ]);

    const renderScene = SceneMap({
        first: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
        second: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Content for the second tab</Text>
            </View>
        ),
        third: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Content for the third tab</Text>
            </View>
        ),
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#0A5380' }}
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
            <View style={{backgroundColor:'white',paddingLeft:20,
                paddingRight:5,
                borderRadius:99,
                marginTop:25,
                display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Order Number"
                    placeholderTextColor="#ecf0f1"
                />
                <Ionicons name="search-circle" size={50} color={Colors.PRIMARY} />

                <Text >검색창</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: 300 }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};



export default AppStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
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
        backgroundColor: '#D3E2FD',
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
        backgroundColor:'#EBECEC',
        // borderColor: 'white',
        // borderWidth: 1,
        color: 'black',
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    headerBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
    },
    headerImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontFamily: 'TheJamsil4Medium',
        color: 'black',
        fontSize: 17,
    },
});
