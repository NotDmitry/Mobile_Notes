import {useState} from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RadioButton} from "react-native-paper";

const Settings = ({sortVisible, setSortVisible, filter, setFilter}) => {
    const [value, setValue] = useState('title');

/*    const options = [
        {title: 'Sort by Title', value: 'title'},
        {title: 'Sort by Body', value: 'body'}
    ]*/

    const SaveSettings = () => {
        setSortVisible(!sortVisible);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={sortVisible}
            onRequestClose={() => {
                setSortVisible(!sortVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose sort</Text>
                    <View>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                setFilter({...filter, sort: value})
                                setValue(value)
                            }}
                            value={value}
                        >
                            <View>
                                <Text>Sort by Title</Text>
                                <RadioButton value="title"/>
                            </View>
                            <View>
                                <Text>Sort by Body</Text>
                                <RadioButton value="body"/>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={SaveSettings}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 30,
        alignItems: 'center',
        elevation: 10,
    },
    buttonSave: {
        backgroundColor: '#eb88fa',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default Settings