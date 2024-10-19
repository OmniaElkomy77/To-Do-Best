import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import HeaderData from "./HeaderData";
import themes from "../../utiltes/Themes";
import images from "../../common/images";
import Icon from "react-native-vector-icons/FontAwesome";
import { IMainHeader } from "../../utiltes/Type/Component";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IScreenParams } from "../../navigation/Screen_name";
export default function MainHeader(props: IMainHeader) {
    const { username, points, icon_setting } = props;

    // Get the navigation object with proper typing
    const navigation = useNavigation<NativeStackNavigationProp<IScreenParams>>();

    return (
        <View style={style.header_container}>
            <Image style={style.header_image} source={images.avatar3} />
            <View style={style.containerdata}>
                <HeaderData icon_name="user" data={username} />
                <HeaderData icon_name="star" data={points} />
                <HeaderData icon_name="trophy" data="∞" />
            </View>

            {icon_setting ? (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Setting")}
                    style={style.icon_container}
                >
                    <Icon name="cogs" size={30} color={themes.grey} />
                </TouchableOpacity>
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
    },
    icon_container: {
        width: "20%",
        alignItems: "center",
    },
    header_image: {
        height: 55,
        width: 55,
        resizeMode: "center",
    },
    containerdata: {
        width: "70%",
    },
});
