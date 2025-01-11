import * as yup from 'yup';

const ResetPasswordSchema = {
    initialValues: {
        password: "",
        password_confirmation: ""
    },

    validationSchema: yup.object().shape({
        password: yup.string().required("Please enter the correct Password").min(6, "The password must be at least 6 characters").max(20, "password must be max 20 characters"),
        password_confirmation: yup.string()
            .oneOf([yup.ref("password"), undefined], "Password doesn't match")
            .required("Please enter the correct Password"),


    }),
}

export default ResetPasswordSchema;
