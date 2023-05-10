import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar, StyleSheet, View} from "react-native";
import NotesList from "../NotesList";
import NewNoteButton from "../UI/button/NewNoteButton";
import {useNavigation} from "@react-navigation/native";
import SettingsButton from "../UI/button/SettingsButton";
import SearchBar from "../SearchBar";
import {useSearchedNotes} from "../../hooks/useNotes";
import Settings from "../UI/modal/Settings";
import * as fileSystem from "../../services/FileService";
import * as dbSystem from '../../services/DbSQLite';
import SortBtn from "../UI/button/SortBtn";
import SortModal from "../UI/modal/SortModal";

const HomeScreen = () => {
    const navigation = useNavigation()

    // States
    const [notes, setNotes] = useState([]);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [filter, setFilter] = useState({sort: '', query: ''})
    //const [searchQuery, setSearchQuery] = useState('')
    const [savingSystem, setSavingSystem] = useState(1);
    const [service, setService] = useState(fileSystem)

    // Custom hook
    const searchedNotes = useSearchedNotes(notes, filter.sort, filter.query)

    // Add settings button to the navigation header
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SettingsButton onPress={() => setSettingsVisible(true)}/>
            ),
        });
    }, []);

    // Add sort button to the navigation header
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <SortBtn onPress={() => setSortVisible(true)}/>
            ),
        });
    }, []);

    useEffect(() => {
        navigation.addListener('focus', getNotes);
        return () => {
            navigation.removeListener('focus', getNotes);
        }
    }, [navigation, service]);

    useEffect(() => {
        changeService()
    }, [savingSystem]);

    useEffect(() => {
        getNotes()
    }, [service])

    const changeService = () => {
        if (savingSystem === 1) {
            fileSystem.createFile()
            setService(fileSystem)
        } else {
            dbSystem.createTable()
            setService(dbSystem)
        }
    }

    const getNotes = async () => {
        setNotes(await service.getAllNotes())
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                filter={filter}
                setFilter={setFilter}
            />
            <View style={{backgroundColor: '#d0f5e7', flex: 1, paddingTop: 5}}>
                <NotesList
                    notes={searchedNotes}
                    remove={() => getNotes()}
                    savingSystem={savingSystem}
                    service={service}
                />
            </View>

            <NewNoteButton
                style={styles.buttonPosition}
                onPress={() => navigation.navigate('Enter Screen', {savingSystem: savingSystem})}
            />

            <Settings
                settingsVisible={settingsVisible}
                setSettingsVisible={setSettingsVisible}
                savingSystem={savingSystem}
                setSavingSystem={setSavingSystem}
            />

            <SortModal
                sortVisible={sortVisible}
                setSortVisible={setSortVisible}
                filter={filter}
                setFilter={setFilter}
            />

            <StatusBar style="auto"/>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },

    buttonPosition: {
        position: "absolute",
        right: 30,
        bottom: 30,
        shadowColor: '#000',
        elevation: 20,
    },

    icons: {
        color: "#fff",
    },

});

export default HomeScreen;