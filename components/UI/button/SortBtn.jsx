import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome} from '@expo/vector-icons';

const SortBtn = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.sortBtn}
            onPress={onPress}
        >
            <FontAwesome name="sort" size={26} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sortBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});

export default SortBtn;
