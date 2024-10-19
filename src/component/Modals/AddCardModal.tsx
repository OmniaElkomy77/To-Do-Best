import React, { useState, useCallback, useMemo } from "react";
import {
    View, Text, Modal, StyleSheet, TouchableOpacity,
    StatusBar, ScrollView, Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import themes from "../../utiltes/Themes";
import { IAddCardModal } from "../../utiltes/Type/Component";
import Card from "../General/Card";

const { height: windowHeight } = Dimensions.get("window");

const AddCardModal = (Props: IAddCardModal) => {
    const { visible, onClose, token, onAddCard } = Props;

    return (
        <Modal visible={visible} animationType={'slide'} transparent={false}>
            {/* <StatusBar backgroundColor={themes.white} barStyle={"dark-content"} /> */}

            <View style={styles.container_modal}>
                <ScrollView>
                    <View style={styles.headercontainer}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={onClose}
                        >
                            <Icon name="arrowleft" size={30} color={themes.black} />
                        </TouchableOpacity>
                        <Text style={styles.headertext}>New card</Text>
                    </View>

                    <Card onAddCard={onAddCard} token={token} onClose={onClose} />
                </ScrollView>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container_modal: {
        height: windowHeight, // Ensure full screen
        backgroundColor: themes.white, // Set background color to white

    },
    headercontainer: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: themes.white,
        elevation: 4,
    },
    icon: {
        marginHorizontal: 10,
    },
    headertext: {
        color: themes.black,
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AddCardModal;
