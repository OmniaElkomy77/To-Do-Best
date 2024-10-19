import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import themes from "../../utiltes/Themes";
import { ICardWeekButton } from "../../utiltes/Type/Component";

export default function CardWeekButton({ lable, onPress, isSelected }: ICardWeekButton) {


    return (
        <TouchableOpacity
            style={[
                style.containerButton,
                {
                    borderColor: themes.primaryColor,
                    borderWidth: 2,
                    backgroundColor: isSelected ? themes.primaryColor : themes.white,
                },
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    style.lableText,
                    { color: isSelected ? themes.white : themes.primaryColor },
                ]}
            >
                {lable}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    containerButton: {
        height: 40,
        width: 120,
        // margin: 3,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    lableText: {
        fontWeight: "500",
    },
});
