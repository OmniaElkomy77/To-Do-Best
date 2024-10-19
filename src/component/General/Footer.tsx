import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'; // Updated AdMob import
import themes from "../../utiltes/Themes";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IScreenParams } from "../../navigation/Screen_name";
import { useNavigation } from '@react-navigation/native';
export default function Footer() {
    // Use TestIds.BANNER for testing; replace with your real Ad Unit ID in production
    // ca - app - pub - 7172268450347981 / 9943275601     //real
    const adUnitID = __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy";
    const navigation = useNavigation<NativeStackNavigationProp<IScreenParams>>();
    return (
        <View style={style.container}>
            <View style={style.adContainer}>
                <BannerAd
                    unitId={adUnitID} // Ad unit ID
                    size={BannerAdSize.FULL_BANNER} // Size of the banner
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdFailedToLoad={(error) => console.error("Ad failed to load: ", error)}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Rank")
                }}

                style={style.rankButton}>
                <Icon name="trophy" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "#545"
    },
    adContainer: {
        height: 80,
        width: "80%",
        // backgroundColor: "#ddd",
        // borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
        // alignSelf:"center"
    },
    rankButton: {
        backgroundColor: themes.primaryColor,
        height: 80,
        width: 80,
        borderTopLeftRadius: 80,
        borderBottomLeftRadius: 80,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",

    },
});
