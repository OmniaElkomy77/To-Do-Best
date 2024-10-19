import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native"
import RankCustom from "../../component/General/RankCustom";
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import MainHeader from "../../component/General/MainHeader";
import { useSelector } from "react-redux";
import Footer from "../../component/General/Footer";
const Rank = ({ }) => {
    const userdata = useSelector((state: any) => state.user.userData);
    useEffect(() => {
        console.log(userdata)
    }, [])
    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <ScrollView>
                <MainHeader points={"45"} username={userdata.username} />
                <RankCustom title="Daily Rank" />
                <RankCustom title="Week Rank" />
                <RankCustom title="Monthly Rank" />
                <RankCustom title="App Week Rank" />
            </ScrollView>
            <Footer />
        </View>
    )
}
export default Rank