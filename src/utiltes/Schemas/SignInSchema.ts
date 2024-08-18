import * as yup from 'yup';
import { EMAIL_REG_EXPRE } from "../Constant"

const SignInSchema = {
    initialValues: {
        email: "",
        password: "",
    },

    validationSchema: yup.object().shape({
        email: yup.string().required("Please enter a valid email address").matches(EMAIL_REG_EXPRE, "Please enter a valid email address").trim(),

        password: yup.string().required("Please enter the correct Password").min(6, "The password must be at least 6 characters").max(20, "password must be max 20 characters"),

    }),


}

export default SignInSchema;
