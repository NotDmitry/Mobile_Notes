import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./components/screens/HomeScreen";
import EditNoteScreen from "./components/screens/EditNoteScreen";

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "All notes",
                        headerStyle: {
                            backgroundColor: "#d929ef"
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "500",
                            fontSize: 24,
                        },
                    }}
                />

                <Stack.Screen
                    name="Enter Screen"
                    component={EditNoteScreen}
                    options={{
                        title: "Enter Note",
                        headerStyle: {
                            backgroundColor: "#d929ef"
                        },
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "500",
                            fontSize: 24,
                        },
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );

}