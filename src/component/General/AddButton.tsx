import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import themes from "../../utiltes/Themes";
import Icon from "react-native-vector-icons/Feather";
import AddCardModal from "../../component/Modals/AddCardModal";
import { AddButtonProps } from "../../utiltes/Type/Component";
import { useSelector } from "react-redux";
export default function AddButton(Props: AddButtonProps) {
    const { onCardAdded, isScrolled } = Props
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const token = useSelector((state: any) => state.user.token)
    return (<>
        <TouchableOpacity
            style={[
                style.container,
                isScrolled ? style.scrolled : style.default
            ]}
            onPress={openModal}
        >
            <Icon name="plus" color={themes.white} size={25} />
        </TouchableOpacity>
        <AddCardModal
            visible={isModalVisible}
            onClose={closeModal}
            token={token}
            onAddCard={onCardAdded}
        />
    </>

    );
}

const style = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        // margin: 5
    },
    default: {
        backgroundColor: themes.primaryColor,
        borderRadius: 25, // Full circle
    },
    scrolled: {
        backgroundColor: themes.primaryColor,
        height: 35,
        width: 60,
        borderTopLeftRadius: 0, // Semi-circle
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingBottom: 5
    }
});