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
import LottieView from 'lottie-react-native';
import themes from "../../utiltes/Themes";
import { IavatarModal } from "../../utiltes/Type/Component";
import GetAllAvatars from "../../utiltes/services/GetAllAvatars";
import images from "../../common/images";
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo

const SelectAvatarModal = (props: IavatarModal) => {
    const { visible, onClose, selectedAvatar } = props;
    const [temporarySelectedAvatar, setTemporarySelectedAvatar] = useState(selectedAvatar);
    const [avatars, setAvatars] = useState<{ id: string, avatar: any, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState<boolean>(true); // Network status

    useEffect(() => {
        const checkNetworkStatus = async () => {
            const state = await NetInfo.fetch();
            setIsConnected(state.isConnected ?? false); // Check if the device is connected to the internet
        };

        checkNetworkStatus(); // Check network status on component mount

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false); // Listen for network status changes
        });

        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, []);

    useEffect(() => {
        const fetchAvatars = async () => {
            if (!isConnected) {
                setLoading(false); // Stop loading if there is no network
                onClose(null, "Select your avatar", ""); // Close the modal if no internet connection
                return;
            }

            try {
                setLoading(true);
                const fetchedAvatars = await GetAllAvatars();
                setAvatars(fetchedAvatars);
            } catch (error) {
                console.error("Error fetching avatars:", error);
            } finally {
                setLoading(false);
            }
        };

        if (visible && isConnected) {
            fetchAvatars();
        }
    }, [visible, isConnected]);

    const avatarSelectedData = (id: string, avatar: any, name: string) => {
        setTemporarySelectedAvatar({ id, avatar, name });
    };

    const handleSelect = () => {
        if (temporarySelectedAvatar) {
            onClose(temporarySelectedAvatar.avatar, temporarySelectedAvatar.name, temporarySelectedAvatar.id);
        } else {
            onClose(null, "Select your avatar", "");
        }
    };

    return (
        <Modal visible={visible} animationType={'slide'} transparent={true}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => onClose(null, "Select your avatar", "")}>
                    <View style={styles.opacityView} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    {loading ? (
                        <LottieView source={images.loading} autoPlay loop style={styles.loadingAnimation} />
                    ) : isConnected ? (
                        <>
                            <FlatList
                                data={avatars}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.avatarItem}
                                        onPress={() => avatarSelectedData(item.id, item.avatar, item.name)}
                                    >
                                        <Image
                                            source={{ uri: item.avatar }}
                                            style={[styles.avatarImage, {
                                                borderWidth: temporarySelectedAvatar?.id === item.id ? 4 : undefined,
                                                borderColor: temporarySelectedAvatar?.id === item.id ? themes.primaryColor : undefined,
                                            }]}

                                        />
                                        <Text style={styles.avatar_name}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={handleSelect}>
                                <Text style={styles.closeButtonText}>Select</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text style={styles.noConnectionText}>No Internet Connection</Text> // Display error message if no internet
                    )}
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
    loadingAnimation: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        marginTop: 100
    },
    avatarItem: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    avatar_name: {
        color: themes.black,
        fontSize: 15,
        fontWeight: "700",
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: "contain",
        backgroundColor: themes.white
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
    noConnectionText: {
        color: themes.grey,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 150,
    },
});

export default SelectAvatarModal;
