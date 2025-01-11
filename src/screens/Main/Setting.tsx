import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    Image,
} from "react-native";
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
import { updateUserData } from "../../redux/slices/userSlices";
import LogOut from "../../utiltes/services/LogOut";
import APIS from "../../utiltes/Api";
import get_userpoints from "../../utiltes/services/UserPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import images from "../../common/images";

const Setting = () => {
    const userdata = useSelector((state: any) => state.user.userData);
    const token = useSelector((state: any) => state.user.token);
    const dispatch = useDispatch();

    const [selectedAvatar, setSelectedAvatar] = useState<{
        avatar: any;
        name: string;
        id: string;
    } | null>(null);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState<string>("0");
    const [connected, setConnected] = useState<boolean | null>(null);

    const data = async () => {
        try {
            const data_points = await get_userpoints(token);
            setPoints(data_points.points);
        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    useEffect(() => {
        if (connected) {
            data();
        }
    }, [connected]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected !== connected) {
                setConnected(state.isConnected);
                if (state.isConnected) {
                    data();
                }
            }
        });

        return () => unsubscribe();
    }, [connected]);

    const [isUsernameExpanded, setIsUsernameExpanded] = useState(false);
    const [isEmailExpanded, setIsEmailExpanded] = useState(false);
    const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

    const formik = useFormik({
        ...UpdateUserDataSchema(userdata),
        enableReinitialize: true,

        onSubmit: (itemValues: IUpdateSettingData) => {
            handleSaveChanges(itemValues);
        },
    });

    const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;

    const handleOpenAvatarModal = () => {
        if (connected) {
            setIsAvatarModalVisible(true);
        } else {
            Alert.alert("No internet connection", "Please check your network.");
        }
    };

    const handleCloseAvatarModal = (avatar: any, name: string, id: string) => {
        if (avatar && name !== "Select your avatar") {
            setSelectedAvatar({ avatar, name, id });
        }
        setIsAvatarModalVisible(false);
    };

    const handleSaveChanges = async (formData: IUpdateSettingData) => {
        // Prepare data to send
        let data_to_send: { [key: string]: any } = {
            username: formData.username,
            email: formData.email,
            avatar: selectedAvatar ? selectedAvatar.id : userdata.avatar,
        };

        // Validate passwords: both must be entered together
        if (formData.password || formData.password_confirmation) {
            if (!formData.password || !formData.password_confirmation) {
                Alert.alert(
                    "Validation Error",
                    "Both password and password confirmation must be provided."
                );
                return;
            }

            if (formData.password !== formData.password_confirmation) {
                Alert.alert("Validation Error", "Passwords do not match.");
                return;
            }

            data_to_send.password = formData.password;
            data_to_send.password_confirmation = formData.password_confirmation;
        }

        try {
            const updatedUserData = await postApiSetting(
                token,
                APIS.Update_user_data,
                data_to_send,
                setLoading
            );

            if (updatedUserData) {
                dispatch(updateUserData(updatedUserData));
            }

            collapseAllSections();
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };


    const collapseAllSections = () => {
        setIsUsernameExpanded(false);
        setIsEmailExpanded(false);
        setIsPasswordExpanded(false);
        setIsAvatarExpanded(false);
    };

    const Deactivate = async () => {
        try {
            AsyncStorage.setItem("hasSeenModal", "false");
            await LogOut(token, APIS.logout, dispatch);
        } catch (error) {
            // console.error("Error logging out:", error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            {connected ? (
                <ScrollView>
                    <MainHeader
                        username={userdata.username}
                        points={points.toString()}
                        icon_setting={false}
                    />
                    <View style={styles.containerSetting}>
                        <SettingData
                            icon_name="user"
                            label="Username"
                            placeholder="Username"
                            value={values.username}
                            onChangeText={handleChange("username")}
                            onBlur={handleBlur("username")}
                            error={touched.username && errors.username}
                            isExpanded={isUsernameExpanded}
                            onToggleExpand={() =>
                                setIsUsernameExpanded(!isUsernameExpanded)
                            }
                        />
                        <SettingData
                            icon_name="mail"
                            label="Email"
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            error={touched.email && errors.email}
                            editable={false}
                            isExpanded={isEmailExpanded}
                            onToggleExpand={() =>
                                setIsEmailExpanded(!isEmailExpanded)
                            }
                            settingEmailColor={true}
                        />
                        <SettingData
                            icon_name="lock"
                            label="Password"
                            isPasswordSection={true}
                            passwordValue={values.password}
                            passwordConfirmationValue={values.password_confirmation}
                            onPasswordChange={handleChange("password")}
                            onPasswordConfirmationChange={handleChange("password_confirmation")}
                            onBlur={handleBlur("password")}
                            error={touched.password && errors.password}
                            isExpanded={isPasswordExpanded}
                            onToggleExpand={() =>
                                setIsPasswordExpanded(!isPasswordExpanded)
                            }
                        />
                        <SettingData
                            icon_name="emoji-happy"
                            label="Avatar"
                            isAvatar={true}
                            selectedAvatar={selectedAvatar}
                            onAvatarPress={handleOpenAvatarModal}
                            isExpanded={isAvatarExpanded}
                            onToggleExpand={() =>
                                setIsAvatarExpanded(!isAvatarExpanded)
                            }
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
                            <Text style={styles.deactivateText}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            ) : (
                <View style={styles.noInternetContainer}>
                    <Image
                        source={images.internet}
                        style={styles.noInternetImage}
                        resizeMode="contain"
                    />
                </View>
            )}
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
    noInternetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noInternetImage: {
        width: 150,
        height: 150,
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
