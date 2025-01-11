import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import themes from '../../utiltes/Themes';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/Entypo';
import { IGenderButton } from '../../utiltes/Type/Component';

export default function GenderButton(props: IGenderButton) {
    const { gender, onPress, icon_name, error } = props
    return (
        <>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                <Icon name={icon_name} size={25} color={themes.grey} />
                <View style={styles.textContainer}>
                    <AppText text={gender || 'Select your gender'} />
                </View>
            </TouchableOpacity>
            {error && <Text style={styles.error_message}>Please select your gender</Text>}

        </>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '94%',
        borderWidth: 1,
        borderColor: themes.grey,
        borderRadius: 25,
        padding: 10,
        alignSelf: 'center',
        marginTop: 15,
    },
    textContainer: {
        width: '95%',
        paddingHorizontal: 7,
    },
    error_message: {
        color: themes.red,
        fontSize: 15,
        textAlign: "center",
    }
});
