import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, BackHandler, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import AuthHeader from "../../component/General/AuthHeader";
import AppInput from "../../component/General/AppInput";
import CountryButton from "../../component/General/CountryButton";
import GenderButton from "../../component/General/GenderButton";
import AvatarButton from "../../component/General/AvatarrButton";
import AppButton from "../../component/General/AppButton";
import SignUpSchema from "../../utiltes/Schemas/SignUpSchema";
import { IUserData } from "../../utiltes/Type/main";
import { Country } from "../../utiltes/countries";
import { useFormik } from "formik";
import SelectCountriesModal from "../../component/Modals/Select_countries_modal";
import SelectAvatarModal from "../../component/Modals/SelectAvatarModal";
import SelectGenderModal from "../../component/Modals/SelectGenderModal";
import images from "../../common/images";
import axios from "axios";
import { Domain } from "../../utiltes/Constant";
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";
interface Props {
    navigation: any;
}

const SignUp = (props: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedCountryError, setSelectedCountryError] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [genderError, setGenderError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState<{ image: any, name: string, id: string } | null>(null);
    const { navigation } = props;
    const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
        ...SignUpSchema,
        onSubmit: (itemValues: IUserData) => {
            let data_to_send = {
                ...itemValues,
                country: selectedCountry?.code,
                gender: selectedGender,
                avatar: selectedAvatar?.id
            }
            postApi(APIS.sign_up, data_to_send, setLoading, (email) => {
                navigation.navigate("OTP", { email });
            }, () => { });

        },
    });

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp();
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    const handleSignup = () => {
        handleSubmit();
        setSelectedCountryError(!selectedCountry);
        setGenderError(!selectedGender);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = (country: Country | null, error: boolean) => {
        if (country) {
            setSelectedCountry(country);
            setSelectedCountryError(false);
        } else if (!country && !error) {
            setSelectedCountryError(true);
        }
        setIsModalVisible(false);
    };

    const handleOpenAvatarModal = () => {
        setIsAvatarModalVisible(true);
    };

    const handleCloseAvatarModal = (avatar: any, name: string, id: string) => {
        if (avatar && name !== "Select your avatar") {
            setSelectedAvatar({ image: avatar, name, id });
        }
        setIsAvatarModalVisible(false);
    };

    const handleOpenGenderModal = () => {
        setIsGenderModalVisible(true);
    };

    const handleCloseGenderModal = (gender: string | null, error: boolean) => {
        if (gender) {
            setSelectedGender(gender);
            setGenderError(false); // Clear error if a valid gender is selected
        } else if (!gender && !error && !selectedGender) {
            setGenderError(true); // Set error if no gender was selected
        }
        setIsGenderModalVisible(false);
    };

    const navigate_toSignIn = () => {
        navigation.navigate("Sign_in");
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Status_Bar />
                <AuthHeader
                    title="Sign Up Now"
                    text="Do you already have an account?"
                    clickable_text=" Sign in"
                    onPress={navigate_toSignIn}
                    navigation={navigation}
                    back_icon={false}
                    photo={images.signup}
                />
                <View style={styles.container}>
                    <AppInput
                        placeholder="User name"
                        icon_name="user"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        error={touched.username && errors.username}
                        errorMessage={touched.username && errors.username ? errors.username : null}
                    />
                    <AppInput
                        placeholder="Email"
                        icon_name="mail"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        value={values.email}
                        errorMessage={touched.email && errors.email ? errors.email : null}
                    />
                    <AppInput
                        placeholder="Password"
                        icon_name="lock"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password || ""}
                        error={touched.password && errors.password}
                        secureTextEntry
                        errorMessage={touched.password && errors.password ? errors.password : null}
                    />
                    <AppInput
                        placeholder="Confirm Password"
                        icon_name="lock"
                        onChangeText={handleChange('password_confirmation')}
                        onBlur={handleBlur('password_confirmation')}
                        value={values.password_confirmation || ""}
                        error={touched.password_confirmation && errors.password_confirmation}
                        secureTextEntry
                        errorMessage={touched.password_confirmation && errors.password_confirmation ? errors.password_confirmation : null}
                    />

                    <CountryButton
                        icon_name="flag"
                        onPress={handleOpenModal}
                        error={selectedCountryError}
                        flag={selectedCountry?.flag}
                        country={selectedCountry ? selectedCountry.name : 'Select Country'}
                    />

                    <GenderButton
                        icon_name="man"
                        onPress={handleOpenGenderModal}
                        gender={selectedGender}
                        error={genderError}
                    />

                    <AvatarButton
                        onPress={handleOpenAvatarModal}
                        text={selectedAvatar ? selectedAvatar.name : "Select Your Avatar"}
                        selectedAvatar={selectedAvatar}
                    />

                    <AppButton
                        Button_title="Sign up" submit={handleSignup}
                        isloading={loading} />
                </View>
            </ScrollView>
            {isModalVisible && (
                <SelectCountriesModal visible={isModalVisible} onClose={handleCloseModal} />
            )}
            {isAvatarModalVisible && (
                <SelectAvatarModal
                    visible={isAvatarModalVisible}
                    onClose={handleCloseAvatarModal}
                    selectedAvatar={selectedAvatar}
                />
            )}
            {isGenderModalVisible && (
                <SelectGenderModal
                    visible={isGenderModalVisible}
                    onClose={handleCloseGenderModal}
                />
            )}
        </View>
    );
};

export default SignUp;
