import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import themes from "../../utiltes/Themes";
import { IRankCustom } from "../../utiltes/Type/Component";
import AppButton from "./AppButton";
export default function RankCustom(Props: IRankCustom) {
    const { title } = Props
    return (
        <View style={style.AllRankContainer}>
            <Text style={style.ranklable}>{title}</Text>
            <View style={style.rankcontainer}>

                <FlatList
                    data={[{}, {}, {}, {}, {}]}
                    renderItem={() => (
                        <View style={style.rankdata}>
                            <Text style={[style.rankdatatext, { width: "30%" }]}>#10</Text>
                            <View style={{ width: "55%" }}>
                                <Text style={style.rankdatatext}> Omnia349</Text>
                            </View>
                            <Text style={style.rankdatatext}>45</Text>
                        </View>
                    )}
                />
                <TouchableOpacity style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "#747"
                }} >
                    <Text style={{
                        color: themes.primaryColor,
                        fontSize: 18,
                        fontWeight: "bold"
                    }}>All Rank</Text>
                </TouchableOpacity>


            </View>

        </View>
    )
}
const style = StyleSheet.create({
    AllRankContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 5,
    },
    ranklable: {
        color: themes.primaryColor,
        fontSize: 20
    },
    rankcontainer: {
        backgroundColor: themes.white,
        height: 250,
        width: "95%",
        borderRadius: 15,
        elevation: 7,

    },
    rankdata: {
        height: 40,
        width: "95%",
        borderBottomWidth: 1,
        borderBottomColor: themes.lightgrey,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"

    },
    rankdatatext: {
        fontSize: 15,
        fontWeight: "bold",
        color: themes.black
    }



})