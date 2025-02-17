import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import HeaderData from "./HeaderData";
import themes from "../../utiltes/Themes";
import Icon from "react-native-vector-icons/FontAwesome";
import { IMainHeader } from "../../utiltes/Type/Component";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IScreenParams } from "../../navigation/Screen_name";
import { useSelector } from "react-redux";
import GetMyAvatar from "../../utiltes/services/GetMyAvatar"; // Import GetMyAvatar function
import images from "../../common/images";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo"; // Import NetInfo for network checks

export default function MainHeader(props: IMainHeader) {
    const { username, points, icon_setting } = props;
    const userdata = useSelector((state: any) => state.user.userData); // Get user data from Redux
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(true); // Network status
    const navigation = useNavigation<NativeStackNavigationProp<IScreenParams>>();
    const token = useSelector((state: any) => state.user.token);

    // Fetch avatar function
    const fetchAvatar = async (token: string, avatar_Id: any) => {
        try {
            if (isConnected) {
                const response = await GetMyAvatar(token, userdata.avatar);
                setAvatarUrl(response.avatar); // Update with actual path if different
            }
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
        }
    };

    useEffect(() => {
        // Listen for network changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Fetch avatar when token or avatar ID changes and network is connected
        if (token && userdata.avatar && isConnected) {
            fetchAvatar(token, userdata.avatar);
        }
    }, [token, userdata.avatar, isConnected]); // Trigger when token, avatar, or network status changes

    return (
        <View style={style.header_container}>
            {/* Display fetched avatar if available, else default avatar */}
            {avatarUrl ? (
                <Image
                    style={style.header_image}
                    source={{ uri: avatarUrl }}
                />
            ) : (
                <LottieView
                    source={images.loading}
                    autoPlay
                    loop
                    style={style.header_image}
                />
            )}
            <View style={style.containerdata}>
                <HeaderData icon_name="user" data={username} />
                <HeaderData icon_name="star" data={points} />
                <HeaderData icon_name="trophy" data={userdata.overall_rank} />
            </View>

            {icon_setting ? (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Setting")}
                    style={style.icon_container}
                >
                    <Icon name="cogs" size={30} color={themes.grey} />
                </TouchableOpacity>
            ) : icon_setting == null ? (
                null
            ) : (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={style.icon_container}
                >
                    <Icon name="angle-right" size={40} color={themes.grey} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    header_container: {
        height: 90,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: themes.white,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        marginVertical: 10,
    },
    icon_container: {
        width: "20%",
        alignItems: "center",
    },
    header_image: {
        height: 55,
        width: 55,
        borderRadius: 27.5, // Make image round
        resizeMode: "cover",
        backgroundColor: themes.white, // Add background color in case image fails to load
    },
    containerdata: {
        width: "70%",
    },
});
