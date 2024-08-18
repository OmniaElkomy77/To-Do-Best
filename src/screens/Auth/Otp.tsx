import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import AuthHeader from "../../component/General/AuthHeader";
import themes from "../../utiltes/Themes";
import AppButton from "../../component/General/AppButton";
import AppText from "../../component/General/AppText";
import images from "../../common/images";
import { useRoute, RouteProp } from "@react-navigation/native";
import { IScreenParams } from '../../navigation/Screen_name'; // Adjust the import path as needed
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";

type OTPScreenRouteProp = RouteProp<IScreenParams, "OTP">;

const OTP = (props: any) => {
    const { navigation } = props;
    const route = useRoute<OTPScreenRouteProp>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error_Otp, seterror_Otp] = useState(false);
    const [error_Otp_message, seterror_Otp_message] = useState("");
    const [timer, setTimer] = useState(120);
    const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setEmail(route.params.email);
    }, [route.params]);

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

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode === "") {
            seterror_Otp(true);
            seterror_Otp_message("You must enter OTP code");
        } else if (otpCode.length < 6) {
            seterror_Otp(true);
            seterror_Otp_message("OTP code is invalid");
        } else {
            seterror_Otp(false);
            let data_to_send = {
                email: email,
                code: otpCode,
            };
            postApi(APIS.otp, data_to_send, setLoading, () => {
                // handle success
            }, stopTimer); // Pass stopTimer as a callback
        }
    };

    const handleResendOtp = () => {
        setTimer(120);
        let data_to_send = {
            email: email,
        };
        postApi(APIS.resend_code, data_to_send, () => { }, () => {
            // handle success
        }, () => { });
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Status_Bar />
                <AuthHeader
                    title="OTP"
                    text=""
                    clickable_text=""
                    navigation={navigation}
                    onPress={() => { }}
                    back_icon={true}
                    photo={images.otp}
                />
                <View style={styles.container}>
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
                        <AppText text={"Request a new OTP code "} />
                        {timer > 0 ? (
                            <Text style={{ color: themes.primaryColor }}>{timer} sec</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResendOtp}>
                                <Text style={{ color: themes.primaryColor }}>Resend</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <AppButton
                        Button_title="Verify OTP"
                        submit={handleVerifyOTP}
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

export default OTP;
