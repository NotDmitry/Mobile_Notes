import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const SaveButton = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.settingsBtn}
            onPress={onPress}
        >
            <FontAwesome name="save" size={30} color="#fff"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    settingsBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});

export default SaveButton;