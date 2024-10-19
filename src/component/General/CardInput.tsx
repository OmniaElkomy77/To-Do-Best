import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native"
import { ICardInput } from "../../utiltes/Type/Component";
import themes from "../../utiltes/Themes";
export default function CardInput(Props: ICardInput) {
    const { placeholder, value, onChangeText, multiline, keyboardType } = Props
    return (
        <>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={themes.lightgrey}
                style={style.input}
                multiline={multiline}
                keyboardType={keyboardType ? "numeric" : "default"}

            />
        </>
    )
}
const style = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: themes.primaryColor,
        width: "100%",
        alignSelf: "center",
        color: themes.black,
        marginBottom: 20,
        fontSize: 16,
        padding: 10,
    },
})