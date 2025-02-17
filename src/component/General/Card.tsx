import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import themes from "../../utiltes/Themes";
import CardLevelButton from "./CardLevelButton";
import CardWeekButton from "./CardWeekButton";
import { ICard } from "../../utiltes/Type/Component";
import AddCard from "../../utiltes/services/AddCard";
import ModalMedia from "../Modals/ModalMedia";
export default function Card(Props: ICard) {
    const { onAddCard, token, onClose } = Props;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedWeekOption, setSelectedWeekOption] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [media, setMedia] = useState<{ avatar_id: number, category_id: string, link: string, type: string }>()
    const [isModalMediaVisible, setIsModalMediaVisible] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const MAX_DESCRIPTION_LENGTH = 1024;


    const handleWeekSelect = (option: string) => {
        setSelectedWeekOption(option);
    };

    const handleLevelSelect = (level: string) => {
        setSelectedLevel(level);
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const validateFields = () => {
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Title cannot be empty.');
            return false;
        }

        if (!time.trim() || isNaN(Number(time)) || Number(time) <= 0) {
            Alert.alert('Validation Error', 'Please enter a valid number of hours.');
            return false;
        }

        if (!selectedLevel) {
            Alert.alert('Validation Error', 'Please select a difficulty level.');
            return false;
        }

        if (!selectedWeekOption) {
            Alert.alert('Validation Error', 'Please select a week option.');
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date && date < today) {
            Alert.alert('Validation Error', 'Please select today\'s date or a future date.');
            return false;
        }

        return true;
    };





    const handleSubmit = async () => {
        const hasInput = title || time || selectedLevel || selectedWeekOption;

        if (!hasInput) {
            onClose();
            return;
        }
        if (!validateFields()) {
            return;
        }

        const newCard = {
            title,
            description,
            level: selectedLevel?.toLowerCase() || "",
            time,
            app_week: selectedWeekOption === "App Week" ? "true" : "false",
            du_date: date ? date.toISOString().split('T')[0] : "",
        };

        try {
            const res = await AddCard(token, newCard);
            // console.log(res.media)
            setMedia(res.media)
            // onClose();
            // onAddCard();
            if (res.media.type != "") {
                showModalMedia()
                setTimeoutId(setTimeout(() => {
                    onClose();
                    hideModalMedia()
                    onAddCard();
                }, 10000))

            } else {
                onClose();
                onAddCard();
            }

        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage = error.response.data?.message || "An unexpected error occurred.";

                if (statusCode === 500) {
                    Alert.alert('Server Error', errorMessage);
                } else {
                    Alert.alert('Error', errorMessage);
                }
            } else if (error.request) {
                Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
        }
    };

    const showModalMedia = () => setIsModalMediaVisible(true);
    const hideModalMedia = () => {
        setIsModalMediaVisible(false);
        if (timeoutId) {
            clearTimeout(timeoutId); // Clear timeout when modal is closed before the 10 seconds are up
        }
        setIsModalMediaVisible(false);
        onClose()
        // console.log("1")
        onAddCard();

    }

    return (
        <View>
            <ScrollView>
                <View style={style.cardContainer}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ color: themes.primaryColor, fontSize: 18, fontWeight: "bold", margin: 5 }}>New Card</Text>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor={themes.lightgrey}
                            style={style.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            placeholderTextColor={themes.lightgrey}
                            multiline={true}
                            style={style.input}
                        />
                        <Text style={style.characterCount}>
                            {description.length}/{MAX_DESCRIPTION_LENGTH}
                        </Text>
                        <TextInput
                            placeholder="Number of hours"
                            value={time}
                            onChangeText={setTime}
                            placeholderTextColor={themes.lightgrey}
                            keyboardType="numeric"
                            style={style.input}
                        />

                        {/* Level Buttons */}
                        <View style={style.buttonContainer}>
                            <CardLevelButton
                                isSelected={selectedLevel === "Easy"}
                                level="Easy"
                                onPress={() => handleLevelSelect("Easy")}
                                borderColor={themes.green} />
                            <CardLevelButton
                                isSelected={selectedLevel === "Medium"}
                                level="Medium"
                                onPress={() => handleLevelSelect("Medium")}
                                borderColor={themes.Yellow} />
                            <CardLevelButton
                                isSelected={selectedLevel === "Hard"}
                                level="Hard"
                                onPress={() => handleLevelSelect("Hard")}
                                borderColor={themes.lightRed} />
                        </View>

                        {/* Week Option Buttons */}
                        <View style={style.weekButtonContainer}>
                            <CardWeekButton
                                lable="Week"
                                isSelected={selectedWeekOption === "Week"}
                                onPress={() => handleWeekSelect("Week")}
                            />
                            <CardWeekButton
                                isSelected={selectedWeekOption === "App Week"}
                                lable="App Week"
                                onPress={() => handleWeekSelect("App Week")}
                            />
                        </View>

                        {/* Date Picker */}
                        <TouchableOpacity
                            style={style.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={style.dateButtonText}>
                                {date ? date.toDateString() : "Select Date"}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date || new Date()}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={style.AddButton} onPress={handleSubmit}>
                        <Text style={style.addtext}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


            <ModalMedia
                visible={isModalMediaVisible}
                onClose={hideModalMedia}
                media={media}
            />


        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        marginVertical: 50,
        width: "90%",
        backgroundColor: themes.white,
        alignSelf: "center",
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60,
        margin: 10,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: themes.primaryColor,
        width: "100%",
        alignSelf: "center",
        color: themes.black,
        marginTop: 10
    },
    characterCount: {
        textAlign: 'right',
        color: themes.grey,
        // marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    weekButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    AddButton: {
        height: 60,
        width: "100%",
        backgroundColor: themes.primaryColor,
        borderBottomRightRadius: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    addtext: {
        color: themes.white,
        fontSize: 15,
        fontWeight: "bold",
    },
    dateButton: {
        backgroundColor: themes.secondaryColor,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 15,
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
    dateButtonText: {
        color: themes.primaryColor,
        fontSize: 16,
    },
});
