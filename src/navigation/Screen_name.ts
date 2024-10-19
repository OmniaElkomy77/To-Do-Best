import { ParamListBase } from "@react-navigation/native";
export interface IScreenNames {
    Sign_in: string;
    Sign_up: string;
    OTP: string;
    Forget_password: string,
    CodeConfirmation: string,
    ResetPassword: string,
    Home: string,
    Setting: string,
    Rank: string
}
export interface IScreenParams extends ParamListBase {
    Sign_in: { email: string, token: string };
    Sign_up: { email: string };
    OTP: { email: string };
    Forget_password: undefined;
    CodeConfirmation: { email: string, token: string }
    ResetPassword: { token: string };
    Home: { email: string }
    Setting: undefined;
    Rank: undefined

}

const SCREEN_NAMES: IScreenNames = {
    Sign_in: 'Sign_in',
    Sign_up: 'Sign_up',
    OTP: "OTP",
    Forget_password: "Forget_password",
    CodeConfirmation: "Codeconfirmation",
    ResetPassword: "ResetPassword",
    Home: "Home",
    Setting: "Setting",
    Rank: "Rank"

};

export default SCREEN_NAMES

