import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from "react-native"
import themes from "../../utiltes/Themes";
import { IButton } from "../../utiltes/Type/Component";
export default function AppButton(props: IButton) {
    const { Button_title, submit, isloading } = props

    return (
        <>
            <TouchableOpacity onPress={submit}
                style={styles.button_style}>
                {isloading ?
                    <ActivityIndicator size={25} color={themes.white} />
                    :
                    <Text style={styles.button_name}>{Button_title}</Text>
                }
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    button_style: {
        backgroundColor: themes.primaryColor,
        height: 60,
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,

    },
    button_name: {
        color: themes.white,
        fontSize: 15,
        fontWeight: "bold"
    }
})