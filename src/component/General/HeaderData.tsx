import React from "react";
import { View, Text, StyleSheet } from "react-native"
import themes from "../../utiltes/Themes";
import Icon from "react-native-vector-icons/FontAwesome"
import { IHeaderData } from "../../utiltes/Type/Component";
export default function HeaderData(Props: IHeaderData) {
    const { icon_name, data } = Props
    return (
        <>
            <View style={style.container}>
                <Icon name={icon_name} color={themes.grey} size={16} />
                <Text style={style.data}>{data}</Text>
            </View>
        </>
    )

}
const style = StyleSheet.create({
    container: {
        // height: 100,
        paddingLeft: 15,
        // width: "25%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"


    },
    data: {
        color: themes.grey,
        fontSize: 16,
        fontWeight: "500",
        width: "90%"
    }
})