import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Alert, Animated, Easing } from "react-native";
import Status_Bar from "../../common/Status_bar";
import MainHeader from "../../component/General/MainHeader";
import AddButton from "../../component/General/AddButton";
import Task_view from "../../component/Items/Task_view";
import Footer from "../../component/General/Footer";
import styles from "../../common/styles";
import { useSelector } from 'react-redux';
import fetchCards from "../../utiltes/services/CardsServices";
import images from "../../common/images";
import EmptyList from "../../component/General/EmptyList";
import { ICardHome } from "../../utiltes/Type/Component";
import get_userpoints from "../../utiltes/services/UserPoints";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = (props: any) => {
    const { navigation } = props;
    const [isScrolled, setScrolled] = useState(false);
    const [points, setPoints] = useState(0);
    const [targetPoints, setTargetPoints] = useState(0);
    const [cards, setCards] = useState<ICardHome[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAnimation, setShowAnimation] = useState(false);
    const token = useSelector((state: any) => state.user.token);
    const userdata = useSelector((state: any) => state.user.userData);

    // Animated values for points animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setScrolled(scrollY > 0);
    };

    const data = async () => {
        const data_points = await get_userpoints(token);
        const user_points = parseInt(data_points.points, 10);
        setTargetPoints(user_points);
    };

    const store_token = async () => {
        await AsyncStorage.setItem("token", JSON.stringify(token))

    }

    useEffect(() => {
        if (token) {
            loadCards();
            data();
        }
        // } else {
        //     // Alert.alert("token", "Unauthenticated");
        // }
    }, [token]);

    useEffect(() => {
        if (targetPoints > points) {
            showPointsAnimation();
        }
    }, [targetPoints]);

    const loadCards = async () => {
        try {
            setLoading(true);
            const fetchedCards = await fetchCards(token);
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error loading cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardDeleted = () => {
        loadCards();
        data(); // Refresh points after card deletion
    };

    const handleCardEdited = () => {
        loadCards();
        data(); // Refresh points after card editing
    };

    const handleCardAdded = () => {
        loadCards();
        data(); // Refresh points after card addition
    };

    const showPointsAnimation = () => {
        setShowAnimation(true);
        const increment = targetPoints - points;
        let currentPoints = points;

        // Points increment animation
        const interval = setInterval(() => {
            if (currentPoints < targetPoints) {
                currentPoints += 1;
                setPoints(currentPoints);
            } else {
                clearInterval(interval);
            }
        }, 100);

        // Fade in and scale up animation
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
            Animated.delay(500), // Show the animation for a short period
            // Fade out and scale down animation
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
        ]).start(() => setShowAnimation(false)); // Reset animation state
    };

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <MainHeader username={userdata.username}
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
                        style={{ width: 150, height: 150, alignSelf: 'center' }}
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
                    <Footer />
                </>
            )}

            {showAnimation && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'gold' }}>
                        {targetPoints} ★
                    </Text>
                </Animated.View>
            )}
        </View>
    );
};

export default Home;
