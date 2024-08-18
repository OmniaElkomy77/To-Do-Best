import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import themes from "../../utiltes/Themes";
import AuthHeader from "../../component/General/AuthHeader";
import AppButton from "../../component/General/AppButton";
import Status_Bar from "../../common/Status_bar";
import styles from "../../common/styles";
import ResetPasswordSchema from "../../utiltes/Schemas/ResetPasswordSchema";
import { useFormik } from "formik";
import { IUserResetPassword } from "../../utiltes/Type/main";
import AppInput from "../../component/General/AppInput";
import images from "../../common/images";
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";
const ResetPassword = (props: any) => {
    const { navigation, route } = props;
    const token = route.params?.token; // Get the token from navigation parameters
    const [loading, setLoading] = useState(false)
    const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
        ...ResetPasswordSchema,
        onSubmit: (itemValues: IUserResetPassword) => {
            // console.log({ ...itemValues, token });
            let data_to_send = {
                ...itemValues,
                token
            }
            console.log(data_to_send)
            postApi(APIS.reset_password, data_to_send, setLoading, () => {
                setLoading(false);
                navigation.navigate("Sign_in")

            },()=>{});

        },
    });

    return (
        <View style={styles.mainContainer}>
            <Status_Bar />
            <AuthHeader
                title="Reset Password"
                text="Please enter your new password"
                onPress={() => { }}
                navigation={navigation}
                back_icon={true}
                photo={images.resetpassword}
            />

            <AppInput
                placeholder="Password"
                icon_name={"lock"}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                secureTextEntry
                errorMessage={touched.password && errors.password ? errors.password : null}
            />
            <AppInput
                placeholder="Confirm Password"
                icon_name={"lock"}
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                value={values.password_confirmation}
                error={touched.password_confirmation && errors.password_confirmation}
                secureTextEntry
                errorMessage={touched.password_confirmation && errors.password_confirmation ? errors.password_confirmation : null}
            />
            <AppButton Button_title="Confirm"
                isloading={loading}
                submit={handleSubmit} />
        </View>
    );
};

export default ResetPassword;
