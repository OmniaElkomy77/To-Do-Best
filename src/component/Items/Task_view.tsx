import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useSelector } from 'react-redux';
import themes from '../../utiltes/Themes';
import { Domain } from '../../utiltes/Constant';
import APIS from '../../utiltes/Api';
import { ITaskView } from '../../utiltes/Type/Component';
import DeleteConfirmModal from '../Modals/DeleteConfirmModal';
import EditCardModal from '../Modals/EditCardModal';

export default function Task_view(Props: ITaskView) {
    const { card, onCardDeleted, onCardEdited } = Props;
    const [checked, setChecked] = useState<boolean>(card.status === 'true');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
    const token = useSelector((state: any) => state.user.token);

    useEffect(() => {
        setChecked(card.status === 'true');
    }, [card.status]);

    const handleCheckBoxPress = async () => {
        if (!token) {
            // console.error('Authentication token is missing.');
            return;
        }

        const newStatus = !checked;
        setChecked(newStatus);
        // onCardEdited();
        try {
            await axios.post(
                Domain + APIS.edit_card_status,
                {
                    card_id: card.id,
                    status: JSON.stringify(newStatus),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            onCardEdited();

        } catch (error) {
            setChecked(!newStatus);
        }
    };

    const handleDeleteCard = async () => {
        try {
            await axios.get(`${Domain + APIS.delete_card}/${card.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setIsModalVisible(false);
            onCardDeleted(); // Notify parent component to refresh card list
        } catch (error) {
            // Handle error
        }
    };

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    const showModalEdit = () => setIsModalEditVisible(true);
    const hideModalEdit = () => setIsModalEditVisible(false);

    return (
        <View style={style.task_container}>
            <View style={style.checkbox_container}>
                <CheckBox
                    checked={checked}
                    onPress={handleCheckBoxPress}
                    checkedColor={themes.primaryColor}
                    uncheckedColor={themes.primaryColor}
                    containerStyle={[
                        style.checkbox,
                        checked ? style.checkboxChecked : style.checkboxUnchecked,
                    ]}
                    checkedIcon="check-circle"
                    uncheckedIcon="circle-o"
                    size={27}
                />
            </View>
            <View style={{ width: '50%' }}>
                <Text style={{ color: themes.black, fontSize: 18, fontWeight: 'bold' }}>{card.title.slice(0, 20)}</Text>
                <Text style={{ color: themes.grey }}>{card.description ? card.description.slice(0, 20) : ""}</Text>
            </View>

            <View style={{ justifyContent: 'space-around', height: '100%' }}>
                <TouchableOpacity onPress={showModalEdit}>
                    <Icon name="edit" size={22} color={themes.darkYellow} />
                </TouchableOpacity>


                <TouchableOpacity onPress={showModal}>
                    <Icon name="trash" size={22} color={themes.lightRed} />
                </TouchableOpacity>


                <Icon name="bell" size={22} color={themes.grey} />
            </View>


            <DeleteConfirmModal
                isVisible={isModalVisible}
                onClose={hideModal}
                onDelete={handleDeleteCard}
            />

            <EditCardModal
                visible={isModalEditVisible}
                onClose={hideModalEdit}
                card={card}
                handleCardEdited={onCardEdited}

            />
        </View>
    );
}

const style = StyleSheet.create({
    task_container: {
        backgroundColor: themes.white,
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        width: '90%',
        alignSelf: 'center',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        elevation: 4,
        marginVertical: 10,
    },
    checkbox_container: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 0,
        margin: 0,
    },
    checkboxChecked: {
        borderWidth: 0,
    },
    checkboxUnchecked: {
        borderWidth: 0,
        borderColor: themes.grey,
    },
});
