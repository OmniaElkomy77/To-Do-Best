import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import themes from "../../utiltes/Themes";
import { IAvatarButton } from "../../utiltes/Type/Component";

const AvatarButton = (props: IAvatarButton) => {
    const { onPress, text, selectedAvatar } = props
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.content}>
                {selectedAvatar?.image &&
                    <Image source={selectedAvatar.image} style={styles.avatar} />}
                <Text style={[styles.text, { marginLeft: selectedAvatar ? 10 : 0 }]}>{text}</Text>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: themes.secondaryColor,
        height: 60,
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 4
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: themes.primaryColor,
        fontSize: 16,
    },
    nameText: {
        color: themes.primaryColor,
        fontSize: 16,
        marginLeft: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default AvatarButton;
