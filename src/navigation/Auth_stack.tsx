import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SCREEN_NAMES from "./Screen_name";
import { Sign_up, Sign_in, OTP, ForgotPassword, CodeConfirmation, ResetPassword } from "../screens/Auth";

const Stack = createNativeStackNavigator();

const Auth_stack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name={SCREEN_NAMES.Sign_up} component={Sign_up} />
            <Stack.Screen name={SCREEN_NAMES.Sign_in} component={Sign_in} />
            <Stack.Screen name={SCREEN_NAMES.OTP} component={OTP} />
            <Stack.Screen name={SCREEN_NAMES.Forget_password} component={ForgotPassword} />
            <Stack.Screen name={SCREEN_NAMES.CodeConfirmation} component={CodeConfirmation} />
            <Stack.Screen name={SCREEN_NAMES.ResetPassword} component={ResetPassword} />
        </Stack.Navigator>
    );
};

export default Auth_stack;
