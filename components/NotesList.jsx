import React from 'react';
import {FlatList, Text} from "react-native";
import NotePreview from "./NotePreview";

const NotesList = ({notes, remove, savingSystem, service}) => {
    if (!notes.length) {
        return (
            <Text style={{textAlign: 'center', fontSize: 24}}>
                Notes not found!
            </Text>
        )
    }

    return (
        <FlatList
            data={notes}
            renderItem={({item}) => (
                <NotePreview note={item} key={item.id} remove={remove} savingSystem={savingSystem} service={service}/>
            )}
        />
    )
}

export default NotesList;