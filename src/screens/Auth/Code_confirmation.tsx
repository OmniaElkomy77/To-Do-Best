import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../common/styles";
import Status_Bar from "../../common/Status_bar";
import AuthHeader from "../../component/General/AuthHeader";
import themes from "../../utiltes/Themes";
import AppButton from "../../component/General/AppButton";
import AppText from "../../component/General/AppText";
import images from "../../common/images";
import { postApi } from "../../utiltes/Api_helper";
import APIS from "../../utiltes/Api";

const CodeConfirmation = (props: any) => {
    const { navigation, route } = props;
    const email = route.params?.email;
    const [loading, setLoading] = useState(false);
    const [CodeConfirmaton, setCodeConfirmaton] = useState(['', '', '', '', '', '']);
    const [error_CodeConfirmaton, seterror_CodeConfirmaton] = useState(false);
    const [error_CodeConfirmaton_message, seterror_CodeConfirmaton_message] = useState("");
    const [timer, setTimer] = useState(120);
    const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
        if (!isNaN(Number(text)) && text.length <= 1) {
            const updatedCodeConfirmaton = [...CodeConfirmaton];
            updatedCodeConfirmaton[index] = text;
            setCodeConfirmaton(updatedCodeConfirmaton);
            if (text.length === 1 && index < CodeConfirmaton.length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]!.focus();
            }
        }
    };

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace') {
            if (CodeConfirmaton[index] === '' && index > 0) {
                inputRefs.current[index - 1]?.focus();
                setCodeConfirmaton((prevCode) => {
                    const updatedCode = [...prevCode];
                    updatedCode[index - 1] = '';
                    return updatedCode;
                });
            } else {
                setCodeConfirmaton((prevCode) => {
                    const updatedCode = [...prevCode];
                    updatedCode[index] = '';
                    return updatedCode;
                });
            }
        }
    };

    const handleVerifyCodeConfirmaton = () => {
        const CodeConfirmatonCode = CodeConfirmaton.join('');
        if (CodeConfirmatonCode === "") {
            seterror_CodeConfirmaton(true);
            seterror_CodeConfirmaton_message("You must enter Code Confirmaton");
        } else if (CodeConfirmatonCode.length < 6) {
            seterror_CodeConfirmaton(true);
            seterror_CodeConfirmaton_message("Code Confirmaton is invalid");
        } else {
            seterror_CodeConfirmaton(false);
            let data_to_send = {
                email: email,
                code: CodeConfirmatonCode
            };
            setLoading(true);
            postApi(APIS.code_confirmation, data_to_send, setLoading, (email, token) => {
                setLoading(false);
                stopTimer(); // Stop the timer only after code is successfully verified
                navigation.navigate("ResetPassword", { token });
            }, () => { });
        }
    };

    const handleResendCodeConfirmaton = () => {
        setTimer(120);
        let data_to_send = {
            email: email,
        };
        postApi(APIS.resend_code, data_to_send, () => { }, () => { }, () => {

        });
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Status_Bar />
                <AuthHeader
                    title="Code Confirmaton"
                    text=""
                    clickable_text=""
                    navigation={navigation}
                    onPress={() => { }}
                    back_icon={true}
                    photo={images.codeconfirmation}
                />
                <View style={styles.container}>
                    <View style={local_styles.inputContainer}>
                        {Array.from({ length: CodeConfirmaton.length }).map((_, index) => (
                            <TextInput
                                key={index}
                                style={local_styles.input}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                onChangeText={(text) => handleInputChange(index, text)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                                value={CodeConfirmaton[index]}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>
                    {error_CodeConfirmaton && (
                        <Text style={local_styles.warning_text}>{error_CodeConfirmaton_message}</Text>
                    )}

                    <View style={local_styles.text_container}>
                        <AppText text={"Request a new Code Confirmaton "} />
                        {timer > 0 ? (
                            <Text style={{ color: themes.primaryColor }}>{timer} sec</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResendCodeConfirmaton}>
                                <Text style={{ color: themes.primaryColor }}>Resend</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <AppButton Button_title="Confirm"
                        isloading={loading}
                        submit={handleVerifyCodeConfirmaton} />
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

export default CodeConfirmation;
