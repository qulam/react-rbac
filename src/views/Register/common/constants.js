import * as yup from "yup";

export const schema = yup.object({
    first_name: yup.string().required('first name can not be blank'),
    last_name: yup.string().required('last name can not be blank'),
    email: yup.string().email().required('email can not be blank'),
    password: yup.string().min(6).max(16).required('password can not be blank'),
});