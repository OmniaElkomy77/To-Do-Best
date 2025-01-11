import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ICustomToastDelete } from '../../utiltes/Type/Component';
import themes from '../../utiltes/Themes';

const CustomToastDelete = ({ text1, text2, onPressCancelButton, onPressDeleteButton }: ICustomToastDelete) => {
    return (
        <View style={styles.toastContainer}>
            <Text style={styles.text}>{text1}</Text>
            {text2 && <Text style={styles.text}>{text2}</Text>}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={onPressCancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPressDeleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        height: 100,
        width: '95%',
        borderRadius: 20,
        backgroundColor: themes.white,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: themes.black,
        fontSize: 15,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        backgroundColor: themes.primaryColor,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: themes.white,
    },
});

export default CustomToastDelete;
