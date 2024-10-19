import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Status_Bar from "../../common/Status_bar";
import MainHeader from "../../component/General/MainHeader";
import themes from "../../utiltes/Themes";
import SettingData from "../../component/General/SettingData";
import Icon from "react-native-vector-icons/AntDesign";
import SelectAvatarModal from "../../component/Modals/SelectAvatarModal";
import AppButton from "../../component/General/AppButton";
import { useFormik } from "formik";
import { IUpdateSettingData } from "../../utiltes/Type/Component";
import UpdateUserDataSchema from "../../utiltes/Schemas/UpdateUserDataSchema";
import postApiSetting from "../../utiltes/services/postApiSetting";
import { updateUserData } from "../../redux/slices/userSlices"
import LogOut from "../../utiltes/services/LogOut";
import APIS from "../../utiltes/Api";

const Setting = () => {
    const userdata = useSelector((state: any) => state.user.userData);
    const token = useSelector((state: any) => state.user.token);
    const dispatch = useDispatch();

    const [selectedAvatar, setSelectedAvatar] = useState<{ image: any, name: string, id: string } | null>(null);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check for userdata updates
    // useEffect(() => {
    //     console.log("Userdata updated:", userdata); // Log userdata changes to check if it's updated
    // }, [userdata]);

    const formik = useFormik({
        ...UpdateUserDataSchema(userdata),
        enableReinitialize: true,  // Reinitialize when userdata changes
        onSubmit: (itemValues: IUpdateSettingData) => {
            handleSaveChanges(itemValues);
        },
    });

    const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;

    const handleOpenAvatarModal = () => {
        setIsAvatarModalVisible(true);
    };

    const handleCloseAvatarModal = (avatar: any, name: string, id: string) => {
        if (avatar && name !== "Select your avatar") {
            setSelectedAvatar({ image: avatar, name, id });
        }
        setIsAvatarModalVisible(false);
    };

    const handleSaveChanges = async (formData: IUpdateSettingData) => {
        let data_to_send = {
            ...formData,
            avatar: selectedAvatar ? selectedAvatar.id : userdata.avatar,
        };

        try {
            const updatedUserData = await postApiSetting(token, APIS.Update_user_data, data_to_send, setLoading);
            if (updatedUserData) {
                dispatch(updateUserData(updatedUserData)); // Update Redux store with new data
                // console.log("Userdata updated in Redux:", updatedUserData); // Log updated data
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const Deactivate = async () => {
        try {
            const logOutUser = await LogOut(token, APIS.logout, dispatch);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <ScrollView>
                <MainHeader username={userdata.username} points="25" />
                <View style={styles.containerSetting}>
                    <SettingData
                        icon_name="user"
                        label="Username"
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={touched.username && errors.username}
                    />
                    <SettingData
                        icon_name="mail"
                        label="Email"
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                    />
                    <SettingData
                        icon_name="lock"
                        label="Password"
                        isPasswordSection={true}
                        passwordValue={values.password}
                        passwordConfirmationValue={values.password_confirmation}
                        onPasswordChange={handleChange('password')}
                        onPasswordConfirmationChange={handleChange('password_confirmation')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password}
                    />
                    <SettingData
                        icon_name="emoji-happy"
                        label="Avatar"
                        isAvatar={true}
                        selectedAvatar={selectedAvatar}
                        onAvatarPress={handleOpenAvatarModal}
                    />
                    <AppButton
                        Button_title="Save Changes"
                        submit={handleSubmit}
                        isloading={loading}
                    />
                    <TouchableOpacity
                        onPress={Deactivate}
                        style={styles.deactivateButton}
                    >
                        <Icon name="logout" size={25} color={themes.red} />
                        <Text style={styles.deactivateText}>Deactivate</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {isAvatarModalVisible && (
                <SelectAvatarModal
                    visible={isAvatarModalVisible}
                    onClose={handleCloseAvatarModal}
                    selectedAvatar={selectedAvatar}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: themes.white,
    },
    containerSetting: {
        width: "92%",
        alignSelf: "center",
        backgroundColor: themes.white,
        elevation: 7,
        marginVertical: 20,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    deactivateButton: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: themes.grey,
        alignItems: "center",
        marginTop: 20,
    },
    deactivateText: {
        color: themes.red,
        fontSize: 18,
        marginHorizontal: 10,
    },
});

export default Setting;
