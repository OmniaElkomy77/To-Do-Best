import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import themes from '../../utiltes/Themes';
import Icon from 'react-native-vector-icons/Entypo';
import { IDeleteConfirmationModal } from '../../utiltes/Type/Component';
const { height: screenHeight } = Dimensions.get('window');
export default function DeleteConfirmModal(Props: IDeleteConfirmationModal) {
    const { isVisible, onClose, onDelete } = Props
    const [modalSlideAnim] = useState(new Animated.Value(screenHeight)); // Initial position

    useEffect(() => {
        if (isVisible) {
            Animated.timing(modalSlideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(modalSlideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: modalSlideAnim }] }]}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Delete Card</Text>
                    <Text style={styles.message}>Are you sure you want to delete this card?</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: themes.white,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themes.black,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: themes.black,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: themes.primaryColor,
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: themes.red,
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: themes.white,
        fontWeight: 'bold',
    },
});


