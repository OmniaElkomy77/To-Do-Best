import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SCREEN_NAMES from "./Screen_name";
import Home from "../screens/Main/Home";
import Setting from "../screens/Main/Setting";
import Rank from "../screens/Main/Rank";

const Stack = createNativeStackNavigator();

const Main_stack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREEN_NAMES.Home} component={Home} />
            <Stack.Screen name={SCREEN_NAMES.Setting} component={Setting} />
            <Stack.Screen name={SCREEN_NAMES.Rank} component={Rank} />
        </Stack.Navigator>
    );
};

export default Main_stack;
