import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import themes from "../../utiltes/Themes"; // Adjust path as per your project structure
import AuthHeader from "../../component/General/AuthHeader"; // Adjust path as per your project structure
import AppButton from "../../component/General/AppButton"; // Adjust path as per your project structure
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import { navigate } from "../../navigation/navigationRef";
import { IUserForgetPassword } from "../../utiltes/Type/main";
import ForgetPasswordSchema from "../../utiltes/Schemas/ForgetPasswordSchema";
import { useFormik } from "formik";
import AppInput from "../../component/General/AppInput";
import images from "../../common/images";
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";

const ForgotPassword = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
        ...ForgetPasswordSchema, onSubmit: (itemValues: IUserForgetPassword) => {
            postApi(APIS.forget_password, itemValues, setLoading, (email) => {
                navigation.navigate("Codeconfirmation", { email });
            }, () => { });
        }
    });

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <AuthHeader
                title="Forgot Password"
                text="Please enter the email associated with your account"
                back_icon={true}
                onPress
                navigation={navigation}
                photo={images.forgetpassword}
            />
            <AppInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                value={values.email}
                icon_name="mail"
                errorMessage={touched.email && errors.email ? errors.email : null}
            />
            <View style={{ height: 10 }}></View>
            <AppButton Button_title="Confirm"
                submit={handleSubmit}
                isloading={loading}
            />
        </View>
    );
};

const local_style = StyleSheet.create({
    input: {
        height: 60,
        width: "90%",
        borderWidth: 1,
        borderColor: themes.grey,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 15,
        alignSelf: "center",
        color: themes.black
    },
    errorText: {
        color: "red",
        textAlign: "center"
    },
});

export default ForgotPassword;
