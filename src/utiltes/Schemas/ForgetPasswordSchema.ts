import * as yup from 'yup';
import { EMAIL_REG_EXPRE } from "../Constant"

const ForgetPasswordSchema = {
    initialValues: {
        email: "",
    },
    validationSchema: yup.object().shape({
        email: yup.string().required("Please enter a valid email address").matches(EMAIL_REG_EXPRE, "Please enter a valid email address").trim(),
    }),


}

export default ForgetPasswordSchema;
