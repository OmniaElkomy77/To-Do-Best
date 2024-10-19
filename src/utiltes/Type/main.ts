import { string } from "yup";

export interface IUserData {
    id?: number;
    username: string;
    email: string;
    password?: string;
    password_confirmation?: string;
};

export interface IUserlogin {

    email: string;
    password: string;

};

export interface IUserForgetPassword {
    email: string;
}
export interface IUserResetPassword {
    password: string;
    password_confirmation: string;
}

