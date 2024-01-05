import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Size from "../../Utils/Size";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const RecentSearch = ({ }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const textInputRef = useRef();

    //검색 이동
    const navigation = useNavigation();

    const navigateToOrderSearch = (searchTerm) => {
        console.log('Navigating to order search with searchTerm:', searchTerm);
        navigation.navigate('OrderSearch', { searchTerm });
    };

    useEffect(() => {
        loadRecentSearches();

        // keyboard Show
        if (textInputRef.current) {
            const showKeyboard = navigation.addListener('focus', () => {
                setTimeout(() => {
                    textInputRef.current?.focus();
                }, 0.1);
            })

            return showKeyboard;
        }
    }, []);


    const loadRecentSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem('recentSearches');
            if (searches) {
                setRecentSearches(JSON.parse(searches));
            }
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    };

    const saveRecentSearch = async () => {
        try {
            // Save the recent search term
            const updatedSearches = [...recentSearches, searchTerm];
            setRecentSearches(updatedSearches);
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        } catch (error) {
            console.error('Error saving recent search:', error);
        }
    };

    const clearRecentSearches = async () => {
        try {
            // Clear recent searches
            setRecentSearches([]);
            await AsyncStorage.removeItem('recentSearches');
        } catch (error) {
            console.error('Error clearing recent searches:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    ref={textInputRef}
                    style={styles.searchInput}
                    placeholder="주문번호를 입력해주세요."
                    placeholderTextColor="#333333"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                {searchTerm.trim() !== '' && (
                    <Ionicons
                        name="search-circle"
                        size={40}
                        color={Colors.PRIMARY}
                        style={{ marginTop: -2.5, marginRight: 2 }}
                        onPress={() => {
                            saveRecentSearch();
                            navigateToOrderSearch(searchTerm);
                            setSearchTerm('');
                        }}
                    />
                )}
            </View>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.RecentTitle}>최근 검색어</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={clearRecentSearches}>
                        <Text style={styles.RecentDelete}>삭제하기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {recentSearches.length > 0 ? (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{  }}
                    horizontal={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.searchTermsContainer}>
                        {recentSearches.map((search, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.recentSearchButton}
                                onPress={() => {
                                    console.log('Search term pressed:', search);
                                    navigateToOrderSearch(search);
                                }}
                            >
                                <Text style={styles.recentSearchText}>{search}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.searchTermsContainer}>
                    <Text style={styles.recentSearchText}>최근 검색어가 없습니다.</Text>
                </View>
            )}
        </View>
    );
};

export default RecentSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    searchContainer: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 5,
        borderRadius: 99,
        marginTop: 10,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },
    searchInput: {
        height: 38,
        width: "84%",
        backgroundColor: '#EBECEC',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginLeft: -15,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 20
    },
    headerLeft: {},
    headerRight: {},
    RecentTitle: {
        color: '#444444',
        fontFamily: 'LINESeedKR-Bd',
        fontSize: 16,
        transform: [
            { translateX: Size.width * 0.04 },
            { translateY: Size.height * 0.016 },
        ],
    },

    RecentDelete: {
        color: '#444444',
        fontFamily: 'LINESeedKR-Rg',
        fontSize: 14,
        transform: [
            { translateX: Size.width * 0.04 },
            { translateY: Size.height * 0.016 },
        ],
    },

    searchTermsContainer: {
        flexDirection: 'row',
        marginVertical: 40,
        marginLeft: 20,
        flexWrap: 'wrap',
    },
    recentSearchButton: {
        backgroundColor: '#D3E2FD',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 20,
    },
    recentSearchText: {
        fontFamily: 'LINESeedKR-Bd',
    }
});