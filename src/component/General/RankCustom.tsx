import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import themes from "../../utiltes/Themes";
import styles from "../../common/styles";
import { IRankCustom } from "../../utiltes/Type/Component";
import LottieView from "lottie-react-native";
import images from "../../common/images";
import { useSelector } from "react-redux";
import ModalMedia from "../Modals/ModalMedia";

export default function RankCustom(Props: IRankCustom) {
    const { generalRank, userRank, tabType, media } = Props;
    const userdata = useSelector((state: any) => state.user.userData);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [IsModalMediaVisible, setIsModalMediaVisible] = useState(false); // State to manage modal visibility
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);
    const showModalMedia = () => setIsModalMediaVisible(true);
    const hideModalMedia = () => setIsModalMediaVisible(false);;

    useEffect(() => {
        // console.log("1")
        if (media !== undefined) {
            showModalMedia()
        }

    }, [media]);

    const isGeneralRankEmpty = !Array.isArray(generalRank) || generalRank.length === 0;
    const isUserRankEmpty = !Array.isArray(userRank) || userRank.length === 0;

    if (isGeneralRankEmpty && isUserRankEmpty && !animationFinished) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <LottieView
                    source={images.loading}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => setAnimationFinished(true)}
                    style={{ width: 150, height: 150, alignSelf: 'center' }}
                />
            </View>
        );
    }

    if (isGeneralRankEmpty && isUserRankEmpty && animationFinished) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={style.noRankText}>Ranking will be updated in time!</Text>
            </View>
        );
    }

    const getHeightAndColor = (rank: number) => {
        if (rank <= 0) {
            return { height: 0, color: themes.grey };
        }

        let height = 250 - (rank - 1) * 50;
        let color;

        switch (rank) {
            case 1:
                color = themes.green;
                break;
            case 2:
                color = themes.Yellow;
                break;
            case 3:
                color = themes.primaryColor;
                break;
            case 4:
                color = themes.lightRed;
                break;
            default:
                color = themes.red;
        }

        return { height, color };
    };

    const data = generalRank.map((item) => {
        const rankKey = tabType === 'Daily' ? 'overall_rank' :
            tabType === 'Monthly' ? 'monthly_rank' :
                tabType === 'Weekly' ? 'week_rank' :
                    tabType === 'App Week' ? 'app_week_rank' : 'overall_rank';

        const Pointskey = tabType === "Daily" ? "overall_rank_points" :
            tabType === 'Monthly' ? "monthly_rank_points" :
                tabType === "Weekly" ? "week_rank_points" :
                    tabType === 'App Week' ? "app_week_rank_points" : "overall_rank_points";

        const points = item[Pointskey] ?? 0;
        const rank = item[rankKey] ?? 0;

        const { height, color } = getHeightAndColor(rank);

        return { ...item, height, color, rank, points };
    });

    const columnOrder = [4, 3, 1, 2, 5];
    const orderedData = columnOrder
        .map((rank) => data.find(item => item.rank === rank))
        .filter((item): item is typeof data[number] => item !== undefined);

    const items = userRank.map((item) => {
        const userRankKey = tabType === 'Daily' ? 'overall_rank' :
            tabType === 'Monthly' ? 'monthly_rank' :
                tabType === 'Weekly' ? 'week_rank' :
                    tabType === 'App Week' ? 'app_week_rank' : 'overall_rank';

        const Pointskey = tabType === "Daily" ? "overall_rank_points" :
            tabType === 'Monthly' ? "monthly_rank_points" :
                tabType === "Weekly" ? "week_rank_points" :
                    tabType === 'App Week' ? "app_week_rank_points" : "overall_rank_points";

        return {
            username: item.username,
            rank: item[userRankKey] ?? 0,
            points: item[Pointskey] ?? 0
        };
    });

    const userExistsInRank = items.some((item) => item.username === userdata.username);

    const highestColumnIndex = orderedData.reduce((highest, current, index) => current.height > orderedData[highest].height ? index : highest, 0);

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={style.AllRankContainer}>
                    {orderedData.length > 0 ? (
                        orderedData.map((item, index) => (
                            <View key={index} style={style.columnContainer}>
                                <Text style={style.columnName}>{item.username.slice(0, 20)}</Text>
                                {index === highestColumnIndex && (
                                    <Icon name="star" size={20} color={themes.Yellow} />
                                )}
                                <View style={[style.bar, {
                                    height: item.height,
                                    backgroundColor: item.color,
                                }]}>
                                    <Text style={style.insideBarText}>{item.rank}</Text>
                                </View>
                                <Text style={style.columnValue}>{item.points}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={style.noRankText}>No Rank Available</Text>
                    )}
                </View>

                <View style={style.itemsContainer}>
                    {items.length > 0 ? (
                        userExistsInRank ? (
                            items.map((item, index) => {
                                const isUserHighlighted = item.username === userdata.username;
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            style.itemRow,
                                            index % 2 === 0
                                                ? { backgroundColor: themes.secondaryColor }
                                                : { backgroundColor: "white" },
                                            isUserHighlighted && style.highlightedItem,
                                        ]}
                                    >
                                        <View style={style.itemWithIcon}>
                                            <Text style={[style.itemValue, { width: "20%" }]}>{item.rank} </Text>
                                            <View style={{ width: "30%", alignItems: "center" }}>
                                                <Icon
                                                    name="trophy"
                                                    size={20}
                                                    color={isUserHighlighted ? themes.Yellow : "grey"}
                                                />
                                            </View>
                                            <Text style={style.itemName}>{item.username}</Text>
                                        </View>
                                        <Text style={style.itemValue}>{item.points}</Text>
                                    </View>
                                );
                            })
                        ) : (
                            <View style={{
                                flex: 1,
                                alignItems: "center", justifyContent: "center",
                                height: 210
                            }}>
                                <Animated.View style={{ transform: [{ scale: pulseAnim }], marginVertical: 10 }}>
                                    <Icon name="trophy" size={80} color={themes.Yellow} />
                                </Animated.View>
                                <Text style={style.noRankText}>Add new card & challenge will start</Text>
                            </View>
                        )
                    ) : (
                        <Text style={style.noRankText}>No User Rank Available</Text>
                    )}
                </View>
            </ScrollView>

            {/* ModalMedia Component to show media */}
            <ModalMedia visible={IsModalMediaVisible}
                onClose={() => hideModalMedia()}
                media={media} />
        </View>
    );
}

const style = StyleSheet.create({
    AllRankContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        height: 350,
        width: "100%",
        paddingHorizontal: 20,
    },
    columnContainer: {
        alignItems: "center",
    },
    bar: {
        width: 40,
        marginVertical: 7,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 5,
        borderRadius: 15,
    },
    insideBarText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    columnName: {
        fontSize: 10,
        fontWeight: "600",
    },
    columnValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
    noRankText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    highlightedItem: {
        backgroundColor: themes.secondaryColor,
    },
    itemsContainer: {
        marginTop: 10,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        marginHorizontal: 10,
    },
    itemWithIcon: {
        flexDirection: "row",
        width: "60%",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        width: "50%",
        paddingLeft: 10,
    },
    itemValue: {
        fontSize: 16,
        fontWeight: "bold",
        width: "20%",
        textAlign: "center",
    },
});
