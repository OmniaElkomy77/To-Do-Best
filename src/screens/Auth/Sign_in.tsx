import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import AuthHeader from "../../component/General/AuthHeader";
import AppInput from "../../component/General/AppInput";
import themes from "../../utiltes/Themes";
import AppButton from "../../component/General/AppButton";
import { useFormik } from "formik";
import SignInSchema from "../../utiltes/Schemas/SignInSchema";
import { IUserlogin } from "../../utiltes/Type/main";
import images from "../../common/images";
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";
import { Api_post_redux } from "../../redux/postApi"
import { useDispatch } from "react-redux";
import { signinUser } from "../../redux/slices/userSlices"
const Sign_in = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
        ...SignInSchema,
        onSubmit: (itemValues: IUserlogin) => {


            setLoading(true)
            // postApi(APIS.signin, itemValues, setLoading, () => {

            // }, () => { });

            Api_post_redux(
                dispatch,
                APIS.signin,
                itemValues,
                setLoading,
                (email, token) => { },
                () => { })
        }


    });

    const navigate_toSignUp = () => {
        navigation.navigate("Sign_up")
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Status_Bar />
                <AuthHeader
                    title="Sign In Now"
                    text="Don't have an account?"
                    clickable_text={" Sign up"}
                    onPress={navigate_toSignUp}
                    navigation={navigation}
                    back_icon={true}
                    photo={images.signin}

                />
                <View style={styles.container}>

                    <AppInput
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        value={values.email}
                        icon_name="mail"
                        errorMessage={touched.email && errors.email ? errors.email : null}
                    />
                    <AppInput
                        placeholder="Password"
                        icon_name="lock"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        error={touched.password && errors.password}
                        secureTextEntry
                        errorMessage={touched.password && errors.password ? errors.password : null}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Forget_password")
                        }}
                    >
                        <Text style={local_styles.forget}>Forget password?</Text>
                    </TouchableOpacity>
                    <AppButton Button_title="Sign In"
                        submit={handleSubmit}
                        isloading={loading}
                    />

                </View>
            </ScrollView>
        </View>
    )
}
const local_styles = StyleSheet.create({
    forget: {
        color: themes.primaryColor,
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 12,
        marginVertical: 5
    }
})
export default Sign_in;