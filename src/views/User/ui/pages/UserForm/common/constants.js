import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const scheme = yupResolver(yup.object().shape({
    first_name: yup.string().min(2).max(256).required('first name is required'),
    last_name: yup.string().min(2).max(256).required('last name is required'),
    email: yup.string().email().required('email can not be blank'),
    password: yup.string().min(6).max(16).required('password can not be blank'),
    phone_number: yup.string().min(2).max(64),
    date_of_birth: yup.string().min(2).max(64),
    is_superuser: yup.boolean(),
    is_admin: yup.boolean(),
    status: yup.boolean(),
    user_permissions: yup.array().min(1),
    groups: yup.array().min(1),
}));