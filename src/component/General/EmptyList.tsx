import React from "react";
import { View, Text, StyleSheet } from "react-native"
import LottieView from "lottie-react-native";
import images from "../../common/images";
export default function EmptyList() {
    return (
        <View style={style.container}>
            <LottieView source={images.emptylist}
                autoPlay
                loop
                style={style.lottie}
            />
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        height: 500,
        width: "90%",
        // backgroundColor: "#454",
        alignItems: "center", justifyContent: "center",
        alignSelf: "center"
    },
    lottie: {
        width: 400,
        height: 450
    }
})