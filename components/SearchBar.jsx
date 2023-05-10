import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

const SearchBar = ({filter, setFilter}) => {
    return (
        <View style={styles.container}>
            <AntDesign name="search1" size={24} color='#fff' style={styles.icon}/>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={(newSearchQuery) => setFilter({...filter, query: newSearchQuery})}
                value={filter.query}
            />
            <TouchableOpacity style={styles.clear} onPress={() => setFilter({...filter, query: ''})}>
                <MaterialIcons name="clear" size={24} color="#fff" style={styles.clear}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },

    input: {
        backgroundColor: '#b2b2b2',
        fontSize: 14,
        paddingVertical: 2,
        marginVertical: 2,
        marginHorizontal: 3,
        paddingLeft: 10,
        flex: 1,
    },

    icon: {
        width: 30,
        height: 30,
        backgroundColor: '#2d2d2d',
    },

    clear: {
        width: 30,
        height: 30,
        paddingTop: 1,
        backgroundColor: '#2d2d2d',
    },

})

export default SearchBar;