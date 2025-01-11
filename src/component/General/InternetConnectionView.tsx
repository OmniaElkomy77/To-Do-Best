import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppText from './AppText';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import themes from '../../utiltes/Themes';

const InternetConnectionView = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    if (isConnected) return null;
    else
        return (
            <View style={styles.container}>
                <Text style={styles.textnetworking}>No Internet Connection</Text>
            </View>
        );
};

export default InternetConnectionView;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 7,
        alignItems: 'center',
        backgroundColor: themes.red,
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
    },
    textnetworking: {
        fontSize: 15,
        color: themes.white
    }
});
