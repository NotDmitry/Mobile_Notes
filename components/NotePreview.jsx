import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";


const NotePreview = ({note, remove, savingSystem, service}) => {
    const navigation = useNavigation();

    const deleteCurrentNote = async () => {
        await service.removeNote(note)
        remove?.()
    }

    const promptToDeleteNote = () => {
        Alert.alert(
            'Delete',
            'Do you want to delete this note?',
            [
                { text: 'Yes', style: 'destructive', onPress: deleteCurrentNote },
                { text: 'No', style: 'cancel' }
            ]);
    }

    return (
        <TouchableOpacity
            style={[styles.mainView, styles.shadow]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Enter Screen', {note: note, savingSystem: savingSystem})}
            onLongPress={promptToDeleteNote}

        >
            <Text style={styles.title} numberOfLines={2}>{note.title}</Text>
            <Text style={styles.datetime}>{note.time}</Text>
            <Text style={styles.body} numberOfLines={3}>{note.body}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainView: {
        marginVertical: 5,
        marginHorizontal: 8,
        width: "auto",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff2ff",
    },

    title: {
        fontSize: 22,
        color: "#0d0810",
        marginBottom: 10,
        fontWeight: '400',
        paddingLeft: 5,
    },

    datetime: {
        color: '#737171',
        fontSize: 12,
        paddingBottom: 7,
        borderBottomColor: '#737171',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingLeft: 15,
        marginBottom: 15,
    },

    body: {
        fontSize: 16,
        fontWeight: "300",
        paddingLeft: 5,
        paddingBottom: 5,
    },

    shadow: {
        shadowColor: '#720b6a',
        elevation: 3,
    },
});

export default NotePreview;