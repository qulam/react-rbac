import * as yup from "yup";

export const schema = yup.object({
    email: yup.string().email().required('email can not be blank'),
    password: yup.string().min(6).max(16).required('password can not be blank'),
});