import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    Animated,
    Easing,
    Image,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Status_Bar from "../../common/Status_bar";
import MainHeader from "../../component/General/MainHeader";
import AddButton from "../../component/General/AddButton";
import Task_view from "../../component/Items/Task_view";
import Footer from "../../component/General/Footer";
import styles from "../../common/styles";
import { useSelector } from "react-redux";
import fetchCards from "../../utiltes/services/CardsServices";
import images from "../../common/images";
import EmptyList from "../../component/General/EmptyList";
import { ICardHome } from "../../utiltes/Type/Component";
import get_userpoints from "../../utiltes/services/UserPoints";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalMedia from "../../component/Modals/ModalMedia";

const Home = (props: any) => {
    const { navigation } = props;
    const [isScrolled, setScrolled] = useState(false);
    const [points, setPoints] = useState(0);
    const [targetPoints, setTargetPoints] = useState(0);
    const [cards, setCards] = useState<ICardHome[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAnimation, setShowAnimation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [connected, setConnected] = useState<boolean | null>(null);

    const token = useSelector((state: any) => state.user.token);
    const userdata = useSelector((state: any) => state.user.userData);
    const media = useSelector((state: any) => state.user.media);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setScrolled(scrollY > 0);
    };

    const fetchPoints = async () => {
        try {
            const data_points = await get_userpoints(token);
            const user_points = parseInt(data_points.points, 10);
            setPoints(data_points.points);
            setTargetPoints(user_points);
        } catch (error) {
            console.error("Error fetching user points:", error);
        }
    };

    const loadCards = async () => {
        try {
            setLoading(true);
            const fetchedCards = await fetchCards(token);
            setCards(fetchedCards);
        } catch (error) {
            console.error("Error loading cards:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkModalStatus = async () => {
        const hasSeenModal = await AsyncStorage.getItem("hasSeenModal");
        const hasSeenModalParsed = hasSeenModal ? JSON.parse(hasSeenModal) : false;
        if (!hasSeenModalParsed) {
            setModalVisible(true);
            const timer = setTimeout(() => {
                setModalVisible(false);
                AsyncStorage.setItem("hasSeenModal", JSON.stringify(true));
                showPointsAnimation();
            }, 10000);
            return () => clearTimeout(timer);
        } else {
            showPointsAnimation();
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected !== connected) {
                setConnected(state.isConnected);
                if (state.isConnected) {
                    fetchPoints();
                    loadCards();
                }
            }
        });
        return () => unsubscribe();
    }, [connected]);

    useEffect(() => {
        if (token) {
            loadCards();
            fetchPoints();
            checkModalStatus();
        }
    }, [token]);

    useEffect(() => {
        if (targetPoints > points) {
            showPointsAnimation();
        }
    }, [targetPoints]);

    const handleCardDeleted = () => {
        loadCards();
        fetchPoints();
        showPointsAnimation();
    };

    const handleCardEdited = () => {
        loadCards();
        fetchPoints();
        showPointsAnimation();
    };

    const handleCardAdded = () => {
        loadCards();
        fetchPoints();
        showPointsAnimation();
    };

    const showPointsAnimation = () => {
        setShowAnimation(true);
        let currentPoints = points;

        const interval = setInterval(() => {
            if (currentPoints < targetPoints) {
                currentPoints += 1;
                setPoints(currentPoints);
            } else {
                clearInterval(interval);
            }
        }, 100);

        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(500),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.ease),
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => setShowAnimation(false));
    };

    // Display No Internet Image when offline
    if (!connected) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={images.internet}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <MainHeader
                username={userdata.username}
                points={points.toString()}
                icon_setting={true}
            />

            <AddButton onCardAdded={handleCardAdded} isScrolled={isScrolled} />

            {loading ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <LottieView
                        source={images.loading}
                        autoPlay
                        loop
                        style={{ width: 150, height: 150, alignSelf: "center" }}
                    />
                </View>
            ) : (
                <>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={cards}
                            renderItem={({ item }) => (
                                <Task_view
                                    key={item.id}
                                    card={item}
                                    onCardDeleted={handleCardDeleted}
                                    onCardEdited={handleCardEdited}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            ListEmptyComponent={() => <EmptyList />}
                        />
                    </View>
                    <Footer icon="trophy" currentScreen="Home" />
                </>
            )}

            {showAnimation && (
                <Animated.View
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 0,
                        right: 0,
                        alignItems: "center",
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "gold" }}>
                        {targetPoints} ★
                    </Text>
                </Animated.View>
            )}

            <ModalMedia
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                media={media}
            />
        </View>
    );
};

export default Home;
