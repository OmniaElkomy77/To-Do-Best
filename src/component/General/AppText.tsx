import React from "react";
import { View, Text, StyleSheet } from "react-native"
import themes from "../../utiltes/Themes";
export default function ({ text }: { text?: string }) {

    return (
        <>
            <Text style={styles.text_style}>{text}</Text>
        </>
    )
}
const styles = StyleSheet.create({
    text_style: {
        color: themes.grey,
        fontSize: 15
    }
})