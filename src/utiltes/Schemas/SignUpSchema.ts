import * as yup from 'yup';
import { EMAIL_REG_EXPRE, NICK_REG_EXPRE } from "../Constant"
const SignUpSchema = {
    initialValues: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    },

    validationSchema: yup.object().shape({
        email: yup.string().required("Please enter a valid email address").matches(EMAIL_REG_EXPRE, "Please enter a valid email address").trim(),

        password: yup.string().required("Please enter the correct Password").min(6, "The password must be at least 6 characters").max(20, "password must be max 20 characters"),

        password_confirmation: yup.string()
            .oneOf([yup.ref("password"), undefined], "Password doesn't match")
            .required("Please enter the correct Password"),

        username: yup.string().required("Please enter an unique user name").matches(NICK_REG_EXPRE, "username must contain only letters, numbers, or underscores and should not start with a number")
    }),
    // validateOnBlur: true

}

export default SignUpSchema;
