import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import themes from "../../utiltes/Themes";
import { ICardLevelButton } from "../../utiltes/Type/Component";

export default function CardLevelButton(Props: ICardLevelButton) {
    const { level, onPress, borderColor, isSelected } = Props
    return (
        <TouchableOpacity
            style={[
                style.button,
                {
                    borderColor: borderColor,
                    borderWidth: 2,
                    backgroundColor: isSelected ? borderColor : themes.white,
                },
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    style.levelText,
                    { color: isSelected ? themes.white : borderColor },
                ]}
            >
                {level}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    button: {
        height: 40,
        width: 90,
        margin: 5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    levelText: {
        fontSize: 15,
        fontWeight: "700",
    },
});
