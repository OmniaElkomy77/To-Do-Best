import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import themes from "../../utiltes/Themes";
import Feather from "react-native-vector-icons/Feather"
import { ITextInput } from "../../utiltes/Type/Component"
import AppText from "./AppText";
import Icon from "react-native-vector-icons/Entypo";
const AppInput = (props: ITextInput) => {
    const { placeholder, icon_name, onChangeText, value, secureTextEntry, errorMessage, error, onBlur } = props

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View >
            <View style={[styles.containerinputstyle]}>
                <Icon name={icon_name} size={24} color={themes.grey} />
                <TextInput
                    style={[styles.inputstyle, {
                        borderColor: error ? themes.red : themes.grey,
                        width: secureTextEntry ? "82%" : "90%"
                    }]}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    onBlur={onBlur}
                    secureTextEntry={showPassword ? false : secureTextEntry}
                    placeholderTextColor={themes.grey}

                />
                {secureTextEntry ?
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? "eye" : "eye-off"} size={24} color={themes.grey} />
                    </TouchableOpacity>
                    : null
                }
            </View>
            {error ?
                <Text style={styles.warn_text} >{errorMessage}</Text>
                : null
            }
        </View>
    )
}
export default AppInput;
const styles = StyleSheet.create({
    containerinputstyle: {
        height: 60,
        width: "95%",
        borderWidth: 1,
        borderColor: themes.grey,
        borderRadius: 25,
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 5,
        // backgroundColor: "#858",


    },
    inputstyle: {

        color: themes.black,
        // backgroundColor: '#514'
    },
    warn_text: {
        color: themes.red,
        fontSize: 15,
        textAlign: "center"
    }
})
