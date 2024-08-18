import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import themes from "../../utiltes/Themes";
import images from "../../common/images";
import { IavatarModal } from "../../utiltes/Type/Component";

const avatars = [
    { id: '1', image: images.avatar1, name: "boy" },
    { id: '2', image: images.avatar2, name: "girl" },
    { id: '3', image: images.avatar3, name: "girl" },
    { id: '4', image: images.avatar4, name: "boy" },
    { id: '5', image: images.avatar3, name: "girl" },
    { id: '6', image: images.avatar1, name: "boy" },
];

const SelectAvatarModal = (props: IavatarModal) => {
    const { visible, onClose, selectedAvatar } = props;
    const [temporarySelectedAvatar, setTemporarySelectedAvatar] = useState<{ id: string, image: any, name: string } | null>(selectedAvatar);

    useEffect(() => {
        if (selectedAvatar) {
            setTemporarySelectedAvatar(selectedAvatar);

        }
    }, [selectedAvatar]);

    const avatarSelectedData = (id: string, image: any, name: string) => {
        setTemporarySelectedAvatar({ id, image, name });
    };

    const handleSelect = () => {
        if (temporarySelectedAvatar) {
            onClose(temporarySelectedAvatar.image, temporarySelectedAvatar.name, temporarySelectedAvatar.id);
        } else {
            onClose(null, "Select your avatar", "");
        }
    };

    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => onClose(null, "Select your avatar", "")}>
                    <View style={styles.opacityView} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <FlatList
                        data={avatars}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.avatarItem}
                                onPress={() => avatarSelectedData(item.id, item.image, item.name)}
                            >
                                <Image
                                    source={item.image}
                                    style={[
                                        styles.avatarImage,
                                        {
                                            borderWidth: temporarySelectedAvatar?.id === item.id ? 4 : undefined,
                                            borderColor: temporarySelectedAvatar?.id === item.id ? themes.primaryColor : undefined,
                                        },
                                    ]}
                                />
                                <Text style={styles.avatar_name}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={handleSelect}>
                        <Text style={styles.closeButtonText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: "center",
    },
    opacityView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        width: '80%',
        height: "50%",
        backgroundColor: themes.white,
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
    },
    avatarItem: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    avatar_name: {
        color: themes.black, fontSize: 15, fontWeight: "700",
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: themes.primaryColor,
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
    },
    closeButtonText: {
        color: themes.white,
        fontSize: 16,
    },
});

export default SelectAvatarModal;
