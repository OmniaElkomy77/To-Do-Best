import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Main_stack from './Main_stack';
import Auth_stack from './Auth_stack';
import { navigationRef } from "./navigationRef"
import { toastConfig } from "../utiltes/toastConfig"
import Toast from 'react-native-toast-message';


const AppNavigator = () => {
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);

    return (
        <NavigationContainer ref={navigationRef}>
            {isUserAuthenticated ? (
                <>
                    <Main_stack />

                </>
            ) : (
                <>
                    <Auth_stack />
                    <Toast config={toastConfig} />
                </>
            )}

        </NavigationContainer>
    );
};

export default AppNavigator;
