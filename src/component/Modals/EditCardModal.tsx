import React, { useState } from 'react';
import {
    View, Text, Modal, StyleSheet, TouchableOpacity,
    ScrollView, Dimensions, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import themes from '../../utiltes/Themes';
import CardLevelButton from '../General/CardLevelButton';
import CardWeekButton from '../General/CardWeekButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardInput from '../General/CardInput'; // Assuming this is a custom input component
import { IEditCardModal } from '../../utiltes/Type/Component';
import { useSelector } from 'react-redux';
import Edit_card from '../../utiltes/services/EditCard';

const { height: windowHeight } = Dimensions.get('window');

const EditCardModal = React.memo((Props: IEditCardModal) => {
    const { visible, onClose, card, handleCardEdited } = Props;
    const [title, setTitle] = useState<string>(card.title);
    const [description, setDescription] = useState<string>(card.description || "");
    const [level, setLevel] = useState<string>(card.level);
    const [time, setTime] = useState<string>(card.time.toString());
    const [appWeek, setAppWeek] = useState<string>(card.app_week);
    const [duDate, setDuDate] = useState<string>(card.du_date);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date(card.du_date) || new Date());
    const token = useSelector((state: any) => state.user.token);

    const maxDescriptionLength = 1024;

    const validateInputs = () => {
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Title is required.');
            return false;
        }
        if (!time.trim()) {
            Alert.alert('Validation Error', 'Number of hours is required.');
            return false;
        }
        if (!level.trim()) {
            Alert.alert('Level is required.');
            return false;
        }
        if (!appWeek.trim()) {
            Alert.alert('App Week selection is required.');
            return false;
        }
        if (!date) {
            Alert.alert('Validation Error', 'Date is required.');
            return false;
        }
        // Check if due date is today or in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison
        if (date < today) {
            Alert.alert('Validation Error', 'Date must be today or in the future.');
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validateInputs()) return;

        const updateCard = {
            card_id: card.id ? card.id.toString() : '',
            title: title.toString(),
            description: description.toString(),
            level: level,
            time: time,
            app_week: appWeek === "true" ? "true" : "false",
            du_date: date ? date.toISOString().split('T')[0] : '',
            status: card.status,
        };

        try {
            await Edit_card(token, updateCard);
            handleCardEdited(); // Handle success
            onClose(); // Close the modal
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                Alert.alert('Server Error', 'An internal server error occurred. Please try again later.');
            } else {
                Alert.alert('Error', error.message || 'An unexpected error occurred while editing the card.');
            }
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <Modal visible={visible} animationType={'slide'} transparent={false}>
            <View style={styles.container_modal}>
                <ScrollView>
                    <View style={styles.headercontainer}>
                        <TouchableOpacity style={styles.icon} onPress={onClose}>
                            <Icon name="arrowleft" size={30} color={themes.black} />
                        </TouchableOpacity>
                        <Text style={styles.headertext}>Edit Card</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <View style={{ padding: 20 }}>
                            <Text style={styles.heading}>Edit Card</Text>
                            <CardInput
                                placeholder="Title"
                                value={title}
                                onChangeText={(value: string) => setTitle(value)}
                                multiline={false}
                            />
                            <CardInput
                                placeholder="Description"
                                value={description}
                                onChangeText={(value: string) => setDescription(value)}
                                multiline={true}
                            />
                            <Text style={styles.charCount}>
                                {`${description.length}/${maxDescriptionLength}`}</Text>
                            <CardInput
                                placeholder="Number of hours"
                                value={time}
                                onChangeText={(value: string) => setTime(value)}
                                multiline={false}
                                keyboardType={true}
                            />

                            <View style={styles.buttonContainer}>
                                <CardLevelButton
                                    isSelected={level === "easy"}
                                    level="Easy"
                                    onPress={() => setLevel("easy")}
                                    borderColor={themes.green}
                                />
                                <CardLevelButton
                                    isSelected={level === "medium"}
                                    level="Medium"
                                    onPress={() => setLevel("medium")}
                                    borderColor={themes.Yellow}
                                />
                                <CardLevelButton
                                    isSelected={level === "hard"}
                                    level="Hard"
                                    onPress={() => setLevel("hard")}
                                    borderColor={themes.lightRed}
                                />
                            </View>

                            <View style={styles.weekButtonContainer}>
                                <CardWeekButton
                                    lable="Week"
                                    isSelected={appWeek === "false"}
                                    onPress={() => setAppWeek("false")}
                                />
                                <CardWeekButton
                                    lable="App Week"
                                    isSelected={appWeek === "true"}
                                    onPress={() => setAppWeek("true")}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.dateButtonText}>
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
                        <TouchableOpacity style={styles.AddButton} onPress={onSubmit}>
                            <Text style={styles.addtext}>Edit Card</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container_modal: {
        height: windowHeight,
        backgroundColor: themes.white,
    },
    headercontainer: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: themes.white,
        elevation: 4,
    },
    icon: {
        marginHorizontal: 10,
    },
    headertext: {
        color: themes.black,
        fontSize: 18,
        fontWeight: "bold",
    },
    cardContainer: {
        marginVertical: 50,
        width: "90%",
        backgroundColor: themes.white,
        alignSelf: "center",
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60,
        margin: 10,
        elevation: 4,
    },
    heading: {
        color: themes.primaryColor,
        fontSize: 18,
        fontWeight: "bold",
        margin: 5,
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
    },
    dateButtonText: {
        color: themes.primaryColor,
        fontSize: 16,
    },
    charCount: {
        color: themes.grey,
        fontSize: 14,
        textAlign: 'right',
        marginTop: -20,
        // marginBottom: 10,
    },
});

export default EditCardModal;
