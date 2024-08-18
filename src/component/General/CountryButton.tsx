import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import themes from "../../utiltes/Themes";
import AppText from "./AppText";
import { ICountryButton } from "../../utiltes/Type/Component"
import Icon from "react-native-vector-icons/Entypo"
    ;
export default function CountryButton(props: ICountryButton) {
    const { country, onPress, icon_name, error, flag } = props



    return (
        <>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                {flag ?
                    <Image source={flag} style={{ resizeMode: "center", height: 15, width: 25 }} />
                    :
                    <Icon name={icon_name} size={25} color={themes.grey} />
                }


                <View style={{
                    width: "95%",
                    paddingHorizontal: 7
                }}>
                    <AppText text={country || "Select your country"} />
                </View>
            </TouchableOpacity>
            {error &&
                <Text style={styles.error_message}>Please select your country</Text>}

        </>

    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        width: "94%",
        borderWidth: 1,
        borderColor: themes.grey,
        borderRadius: 25,
        padding: 10,
        alignSelf: "center",
        marginTop: 15,
    },
    text: {
        color: themes.black,
        width: "90%",
    },
    error_message: {
        color: themes.red,
        fontSize: 15,
        textAlign: "center",
    }
});
