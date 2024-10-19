import * as yup from 'yup';
import { EMAIL_REG_EXPRE, NICK_REG_EXPRE } from "../Constant";

const UpdateUserDataSchema = (userdata: any) => {
    return {
        initialValues: {
            username: userdata.username || "",
            email: userdata.email || "",
            password: "",
            password_confirmation: ""
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Please enter a valid email address")
                .matches(EMAIL_REG_EXPRE, "Please enter a valid email address")
                .trim(),
            password: yup
                .string()
                .required("Please enter the correct password")
                .min(6, "The password must be at least 6 characters")
                .max(20, "The password must be a maximum of 20 characters"),
            password_confirmation: yup
                .string()
                .oneOf([yup.ref("password"), undefined], "Passwords don't match")
                .required("Please confirm the password"),
            username: yup
                .string()
                .required("Please enter a unique username")
                .matches(NICK_REG_EXPRE, "Username must only contain letters, numbers, or underscores and should not start with a number"),
        }),
    };
};

export default UpdateUserDataSchema;
