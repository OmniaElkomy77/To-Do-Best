import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import themes from "../../utiltes/Themes";
import { countries, Country } from "../../utiltes/countries";
import { ICountryModal } from "../../utiltes/Type/Component";

const SelectCountriesModal = (props: ICountryModal) => {
    const { visible, onClose } = props;
    const [allCountries, setAllCountries] = useState<Country[]>([]);

    useEffect(() => {
        setAllCountries(countries);
    }, []);

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
                        data={allCountries}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.countryItem}
                                onPress={() => onClose(item, false)}
                            >
                                <Image source={item.flag} style={{ height: 30, width: 40, resizeMode: "contain" }} />
                                <Text style={styles.countryText}>{item.name}</Text>
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
        justifyContent: "center",
    },
    opacityView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        width: '80%',
        height: "70%",
        backgroundColor: themes.white,
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
    },
    countryItem: {
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 10,
    },
    countryText: {
        color: themes.black,
        fontSize: 15,
        marginLeft: 10,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: themes.primaryColor,
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
    },
    closeButtonText: {
        color: themes.white,
        fontSize: 16,
    },
});

export default SelectCountriesModal;
