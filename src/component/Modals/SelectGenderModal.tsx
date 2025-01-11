import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
import themes from '../../utiltes/Themes';
import { IGenderModal } from '../../utiltes/Type/Component';

const genders = [
    { id: '1', name: 'male', icon: 'male' },
    { id: '2', name: 'female', icon: 'female' },

];

const SelectGenderModal = (props: IGenderModal) => {
    const { visible, onClose } = props;
    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => onClose(null, true)}>
                    <View style={styles.opacityView} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <FlatList
                        data={genders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.genderItem}
                                onPress={() => onClose(item.name, false)}
                            >
                                <Icon name={item.icon} size={25} color={themes.primaryColor} style={styles.genderIcon} />
                                <Text style={styles.genderText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => onClose(null, true)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
    },
    opacityView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        width: '80%',
        height: '35%',
        backgroundColor: themes.white,
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
    },
    genderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        // justifyContent: 'flex-start',
        // backgroundColor: "#188"
    },
    genderIcon: { // Added style for gender icon
        marginLeft: 10,
        width: 25
    },
    genderText: {
        color: themes.black,
        fontSize: 15,
        marginLeft: 10,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: themes.primaryColor,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    closeButtonText: {
        color: themes.white,
        fontSize: 16,
    },
});

export default SelectGenderModal;
