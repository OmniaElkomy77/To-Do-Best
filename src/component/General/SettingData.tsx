import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import themes from "../../utiltes/Themes";
import Icon from "react-native-vector-icons/Entypo";
import { ISettingData } from "../../utiltes/Type/Component";
import AppInput from "./AppInput";
import AvatarButton from "./AvatarrButton";

const SettingData = (props: ISettingData) => {
    const {
        icon_name,
        label,
        placeholder,
        value,
        onChangeText,
        secureTextEntry,
        onBlur,
        error,
        isAvatar,
        selectedAvatar,
        onAvatarPress,
        isPasswordSection,
        passwordValue,
        passwordConfirmationValue,
        onPasswordChange,
        onPasswordConfirmationChange,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.settingRow}>
                <View style={styles.iconLabel}>
                    <Icon name={icon_name} size={25} />
                    <Text style={styles.label}>{label}</Text>
                </View>
                <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={25} />
            </TouchableOpacity>

            {isExpanded && (
                isAvatar ? (
                    <AvatarButton
                        onPress={onAvatarPress}
                        text="Select Avatar"
                        selectedAvatar={selectedAvatar}
                    />
                ) : isPasswordSection ? (
                    <>
                        <AppInput
                            placeholder="New Password"
                            icon_name="lock"
                            value={passwordValue}
                            secureTextEntry={true}
                            onChangeText={onPasswordChange}
                        />
                        <AppInput
                            placeholder="Confirm Password"
                            icon_name="lock"
                            value={passwordConfirmationValue}
                            secureTextEntry={true}
                            onChangeText={onPasswordConfirmationChange}
                        />
                    </>
                ) : (
                    <>
                        <AppInput
                            placeholder={placeholder}
                            icon_name={icon_name}
                            value={value}
                            secureTextEntry={secureTextEntry}
                            onChangeText={onChangeText}
                            onBlur={onBlur}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    iconLabel: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        color: themes.grey,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10,
    },
    errorText: {
        color: "red", // Error message styling
        fontSize: 12,
        marginTop: 5,
        textAlign: "center"
    },
});

export default SettingData;
