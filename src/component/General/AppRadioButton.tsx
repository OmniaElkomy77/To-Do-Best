import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import themes from "../../utiltes/Themes";
import { IRadioButton } from "../../utiltes/Type/Component";

export default function AppRadioButton(props: IRadioButton) {
    const { selectedId, onSelect, error } = props

    const radioButtonsData = [
        { id: '1', label: 'Male' },
        { id: '2', label: 'Female' },
    ];
    return (
        <>
            <View style={styles.gender_view}>
                <Text style={styles.gender_text}>Gender</Text>
            </View>

            <RadioGroup
                radioButtons={radioButtonsData}
                onPress={onSelect}
                selectedId={selectedId}
                labelStyle={styles.label}
                containerStyle={styles.container}
            />

        </>
    );
}

const styles = StyleSheet.create({
    gender_view: {
        margin: 10
    },
    gender_text: {
        color: themes.black,
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
    },
    label: {
        fontSize: 18,
        color: themes.grey
    },
    errorBorder: {
        borderColor: 'red',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
        alignSelf: "center"
    },
});
