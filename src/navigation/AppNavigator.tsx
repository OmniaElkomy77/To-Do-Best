import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Main_stack from './Main_stack';
import Auth_stack from './Auth_stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef } from "./navigationRef"
import { toastConfig } from "../utiltes/toastConfig"
import Toast from 'react-native-toast-message';
import Splash_Screen from '../screens/Splash/Splash_Screen';


const AppNavigator = () => {
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);
    const [isAppReady, setIsAppReady] = useState(false);
    useEffect(() => {

        setTimeout(() => {
            setIsAppReady(true);
        }, 1000);
    }, []);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            {isAppReady ?
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

                </NavigationContainer >
                :
                <Splash_Screen />
            }
        </GestureHandlerRootView>
    );
};

export default AppNavigator;
