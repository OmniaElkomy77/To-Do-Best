import * as yup from "yup";
import { EMAIL_REG_EXPRE, NICK_REG_EXPRE } from "../Constant";

const UpdateUserDataSchema = (userdata: any) => {
    return {
        initialValues: {
            username: userdata.username || "",
            email: userdata.email || "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Please enter a valid email address")
                .matches(EMAIL_REG_EXPRE, "Please enter a valid email address")
                .trim(),
            password: yup
                .string()
                .notRequired() // Make password not required
                .min(6, "The password must be at least 6 characters")
                .max(20, "The password must not exceed 20 characters"),
            password_confirmation: yup
                .string()
                .notRequired() // Make password_confirmation not required
                .oneOf([yup.ref("password"), null], "Passwords do not match")
                .min(6, "The password must be at least 6 characters")
                .max(20, "The password must not exceed 20 characters"),
            username: yup
                .string()
                .required("Please enter a valid username")
                .matches(NICK_REG_EXPRE, "Please enter a valid username")
                .trim(),
        }),
    };
};

export default UpdateUserDataSchema;
