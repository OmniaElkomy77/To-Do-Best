import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import themes from "../../utiltes/Themes";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/AntDesign";
import { IHeader } from "../../utiltes/Type/Component";
export default function AuthHeader(props: IHeader) {
    const { title, text, clickable_text, back_icon, onPress, navigation, photo } = props
    return (
        <View style={styles.container}>
            {back_icon &&
                <TouchableOpacity
                    onPress={() => {
                        navigation?.goBack()
                    }}
                    style={styles.icon}>
                    <Icon name="arrowleft" size={30} color={themes.black} />
                </TouchableOpacity>
            }

            <View style={styles.logo_container}>
                <Image source={photo} style={styles.logo_style} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.text_container}>
                <AppText text={text} />
                <TouchableOpacity
                    onPress={onPress}>
                    <Text style={styles.clickable_text}>{clickable_text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:
    {
        // marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#747"
    },
    icon: {
        // height: 50,
        // backgroundColor: "#585",
        alignSelf: "flex-start",
        marginHorizontal: 10,
        width: 100,

    },
    logo_container:
    {
        height: 160
    },
    clickable_text: {
        color: themes.primaryColor,
        fontSize: 16


    },

    logo_style:
    {
        height: 160,
        // width: 100,
        resizeMode: "center",
        // backgroundColor: "#858"
    },

    title:
    {
        color: themes.black,
        fontWeight: "bold",
        fontSize: 20
    },
    text_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})