import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import AuthHeader from "../../component/General/AuthHeader";
import themes from "../../utiltes/Themes";
import AppButton from "../../component/General/AppButton";
import AppText from "../../component/General/AppText";
import AppInput from "../../component/General/AppInput";
import images from "../../common/images";
import { useDispatch } from "react-redux";
import { Api_post_redux } from "../../redux/postApi";
import APIS from "../../utiltes/Api";
import ActiveAccountSchema from "../../utiltes/Schemas/ActiveAccountSchema";
import { useFormik } from "formik";
import { IActivateAccount } from "../../utiltes/Type/main";
const Activate_account = (props: any) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error_Otp, seterror_Otp] = useState(false);
    const [error_Otp_message, seterror_Otp_message] = useState("");
    const [timer, setTimer] = useState(120);
    const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
        useFormik({
            ...ActiveAccountSchema,
            onSubmit: (itemValues: IActivateAccount) => {
                setEmail(itemValues.email)
                handleVerifyOTP(itemValues.email)
            }
        });


    useEffect(() => {
        if (timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timer]);

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleInputChange = (index: number, text: string) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);

        if (text !== '' && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace') {
            const updatedOtp = [...otp];
            if (otp[index] !== '') {
                updatedOtp[index] = '';
                setOtp(updatedOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                updatedOtp[index - 1] = '';
                setOtp(updatedOtp);
            }
        }
    };

    const handleVerifyOTP = async (user_email: string) => {
        const otpCode = otp.join('');
        if (otpCode === "") {
            seterror_Otp(true);
            seterror_Otp_message("You must enter Activate code");

        } else if (otpCode.length < 6) {
            seterror_Otp(true);
            seterror_Otp_message("Activate code is invalid");
        } else if (email === "") {
            seterror_Otp(true);
            seterror_Otp_message("Email is required");
        } else {
            seterror_Otp(false);
            const data_to_send = { email: user_email, code: otpCode };
            Api_post_redux(dispatch, APIS.otp, data_to_send, setLoading, () => { }, stopTimer);
        }
    };

    const handleResendOtp = () => {
        setTimer(120);
        const data_to_send = { email };
        Api_post_redux(dispatch, APIS.resend_code, data_to_send, setLoading, () => { }, stopTimer);
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Status_Bar />
                <AuthHeader
                    title="Activate Account"
                    text=""
                    clickable_text=""
                    navigation={navigation}
                    onPress={() => { }}
                    back_icon={true}
                    photo={images.otp}
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

                    <View style={local_styles.inputContainer}>
                        {Array.from({ length: otp.length }).map((_, index) => (
                            <TextInput
                                key={index}
                                style={local_styles.input}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                onChangeText={(text) => handleInputChange(index, text)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                                value={otp[index]}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>
                    {error_Otp && (
                        <Text style={local_styles.warning_text}>{error_Otp_message}</Text>
                    )}


                    <View style={local_styles.text_container}>
                        <AppText text={"Request a new Activate code "} />
                        {timer > 0 ? (
                            <Text style={{ color: themes.primaryColor }}>{timer} sec</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResendOtp}>
                                <Text style={{ color: themes.primaryColor }}>Resend</Text>
                            </TouchableOpacity>
                        )}
                    </View>


                    <AppButton
                        Button_title="Verify Activation"
                        submit={handleSubmit}
                        isloading={loading}
                    />




                </View>
            </ScrollView>
        </View>
    );
};

const local_styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        width: "90%",
        alignSelf: "center",
    },
    input: {
        height: 50,
        width: 50,
        borderColor: themes.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlign: "center",
        fontSize: 20,
        color: themes.black,
    },
    warning_text: {
        color: themes.red,
        fontSize: 15,
        textAlign: "center",
    },
    text_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Activate_account;
