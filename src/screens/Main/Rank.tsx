import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import RankCustom from '../../component/General/RankCustom';
import styles from '../../common/styles';
import Status_Bar from '../../common/Status_bar';
import MainHeader from '../../component/General/MainHeader';
import Footer from '../../component/General/Footer';
import themes from '../../utiltes/Themes';
import { useSelector } from 'react-redux';
import get_userpoints from '../../utiltes/services/UserPoints';
import Rank_api from '../../utiltes/services/Rank_api';
import APIS from '../../utiltes/Api';
import images from '../../common/images';
const Tab = createMaterialTopTabNavigator();

const DailyRank = () => {
    const token = useSelector((state: any) => state.user.token);
    const [dailyTop5, setDailyTop5] = useState([]);
    const [dailyUserRank, setDailyUserRank] = useState([]);
    const [media, setMedia] = useState<{
        avatar_id: number, category_id: string, link: string,
        type: string,
        duration: number
    }>();

    useEffect(() => {
        const fetchRankData = async () => {
            const top5Data = await Rank_api(token, APIS.dailyranktop5);
            const userRankData = await Rank_api(token, APIS.dailyuserrank);
            setDailyTop5(top5Data.data);  // Assuming API response is in expected format
            setMedia(userRankData.media);
            // console.log(media)
            setDailyUserRank(userRankData.data);
        };

        fetchRankData();
    }, [token]);

    return (
        <View style={style.rankContainer}>
            <RankCustom generalRank={dailyTop5} userRank={dailyUserRank} tabType="Daily" media={media} />
        </View>
    );
};

const MonthlyRank = () => {
    const token = useSelector((state: any) => state.user.token);
    const [monthlyTop5, setMonthlyTop5] = useState([]);
    const [monthlyUserRank, setMonthlyUserRank] = useState([]);

    useEffect(() => {
        const fetchRankData = async () => {
            const top5Data = await Rank_api(token, APIS.monthlyranktop5);
            const userRankData = await Rank_api(token, APIS.monthlyuserrank);
            setMonthlyTop5(top5Data.data);
            setMonthlyUserRank(userRankData.data);
        };

        fetchRankData();
    }, [token]);

    return (
        <View style={style.rankContainer}>
            <RankCustom generalRank={monthlyTop5}
                userRank={monthlyUserRank} tabType="Monthly" media={undefined} />
        </View>
    );
};

const WeeklyRank = () => {
    const token = useSelector((state: any) => state.user.token);
    const [weeklyTop5, setWeeklyTop5] = useState([]);
    const [weeklyUserRank, setWeeklyUserRank] = useState([]);

    useEffect(() => {
        const fetchRankData = async () => {
            const top5Data = await Rank_api(token, APIS.weekranktop5);
            const userRankData = await Rank_api(token, APIS.weekuserrank);
            setWeeklyTop5(top5Data.data);
            setWeeklyUserRank(userRankData.data);
        };

        fetchRankData();
    }, [token]);

    return (
        <View style={style.rankContainer}>
            <RankCustom generalRank={weeklyTop5} userRank={weeklyUserRank} tabType="Weekly"
                media={undefined} />
        </View>
    );
};

const AppWeekRank = () => {
    const token = useSelector((state: any) => state.user.token);
    const [appWeekTop5, setAppWeekTop5] = useState([]);
    const [appWeekUserRank, setAppWeekUserRank] = useState([]);

    useEffect(() => {
        const fetchRankData = async () => {
            const top5Data = await Rank_api(token, APIS.appweekranktop5);
            const userRankData = await Rank_api(token, APIS.appweekuserrank);
            setAppWeekTop5(top5Data.data);
            setAppWeekUserRank(userRankData.data);
        };

        fetchRankData();
    }, [token]);

    return (
        <View style={style.rankContainer}>
            <RankCustom generalRank={appWeekTop5} userRank={appWeekUserRank}
                tabType="App Week" media={undefined} />
        </View>
    );
};

const Rank = () => {
    const userdata = useSelector((state: any) => state.user.userData);
    const [points, setPoints] = useState<string>("");
    const token = useSelector((state: any) => state.user.token);
    const [isConnected, setIsConnected] = useState<boolean | null>(true); // Updated type to allow null

    useEffect(() => {
        const fetchUserPoints = async () => {
            const dataPoints = await get_userpoints(token);
            setPoints(dataPoints.points);
        };

        const checkNetworkStatus = () => {
            NetInfo.fetch().then(state => {
                setIsConnected(state.isConnected ?? false); // Handle null by defaulting to false
                if (state.isConnected) { // Fetch points when reconnected
                    fetchUserPoints();
                }
            });
        };

        fetchUserPoints();
        checkNetworkStatus(); // Check network on initial load

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false); // Listen to network status changes
            if (state.isConnected) { // Fetch points when reconnected
                fetchUserPoints();
            }
        });

        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, [token]);

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            {!isConnected ? ( // Conditionally render based on connectivity
                <View style={style.noInternetContainer}>
                    <Image
                        source={images.internet} // Replace with your image path
                        style={style.noInternetImage}
                        resizeMode="contain"
                    />

                </View>
            ) : (
                <>
                    <MainHeader points={points.toString()} username={userdata.username} />
                    <Tab.Navigator>
                        <Tab.Screen name="Daily" component={DailyRank} />
                        <Tab.Screen name="Monthly" component={MonthlyRank} />
                        <Tab.Screen name="Weekly" component={WeeklyRank} />
                        <Tab.Screen name="App Week" component={AppWeekRank} />
                    </Tab.Navigator>
                    <Footer icon='home' currentScreen='Rank' />
                </>
            )}


        </View>
    );
};

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: themes.white,
    },
    rankContainer: {
        flex: 1,
    },
    noInternetContainer: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    noInternetImage: {
        width: 150,
        height: 150,
        // marginBottom: 10,
    },
    noInternetText: {
        fontSize: 16,
        color: themes.grey,
        fontWeight: "bold",
    },
});

export default Rank;
