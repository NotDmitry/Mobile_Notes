import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, TextInput} from "react-native";
import {useNavigation} from "@react-navigation/native";
import SaveButton from "../UI/button/SaveButton";

import * as fileSystem from '../../services/FileService';
import * as dbSystem from '../../services/DbSQLite';

const EditNoteScreen = ({route}) => {
    const navigation = useNavigation()
    const [isButtonClick, setIsButtonClick] = useState(false)
    const [note, setNote] = useState({
        id: -1,
        time: '',
        title: '',
        body: '',
    });
    const [service, setService] = useState(fileSystem)

    useEffect(() => {
        if (isButtonClick) {
            (async () => {
                const id = await service.addOrUpdateNote(note)
                setNote({...note, id: id})
            })()
            setIsButtonClick(false)
        }
    }, [isButtonClick])

    const saveNote = () => {
        if (note.title === '')
            note.title = 'Untitled'
        setNote({...note, time: Date()})
        setIsButtonClick(true)
    }

    // Add save button to the navigation header
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <SaveButton onPress={saveNote}/>
            },
        });
    }, [note]);

    // Initialize screen and saving service object
    useEffect(() => {
        if (route.params !== undefined && route.params.note !== undefined) {
            navigation.setOptions({title: 'Selected note'})
            setNote(route.params.note)
        } else {
            navigation.setOptions({title: 'Enter your note'})
            setNote({
                id: -1,
                time: '',
                title: '',
                body: '',
            })
        }
        if (route.params !== undefined && route.params.savingSystem === 1) {
            fileSystem.createFile();
            setService(fileSystem);
        } else {
            dbSystem.createTable();
            setService(dbSystem);
        }
    }, []);

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.title}
                placeholder="Title..."
                onChangeText={(newTitle) => setNote({...note, title: newTitle})}
                multiline={true}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={note.title}
                defaultValue={note.title}
            />
            <TextInput
                style={styles.body}
                underlineColorAndroid="transparent"
                placeholder="Your text..."
                onChangeText={(newBody) => setNote({...note, body: newBody})}
                multiline={true}
                value={note.body}
                defaultValue={note.body}
            />
            <StatusBar style='auto'/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        borderBottomColor: '#737171',
        borderBottomWidth: 0.8,
    },
    body: {

        fontSize: 18,
        paddingBottom: 100,
    },
});

export default EditNoteScreen