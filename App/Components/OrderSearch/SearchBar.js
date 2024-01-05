import {View, Text, TextInput, StyleSheet} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import {useNavigation} from "@react-navigation/native";

import RecentSearch from "./RecentSearch";

const SearchBar=()=> {
    const textInputRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    //검색 이동
    const navigation = useNavigation();

    const navigateToOrderSearch = (searchTerm) => {
        console.log('Navigating to order search with searchTerm:', searchTerm);
        navigation.navigate('OrderSearch', { searchTerm });
    };

    useEffect(() => {

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

    return(
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
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor:'white',
        paddingLeft:15,
        paddingRight:5,
        borderRadius:99,
        marginTop:10,
        display:'flex',flexDirection:'row',justifyContent:'space-between'
    },
    searchInput: {
        height: 38,
        width: "84%",
        backgroundColor:'#EBECEC',
        // borderColor: 'white',
        // borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,

        paddingHorizontal: 10,
    },

})


