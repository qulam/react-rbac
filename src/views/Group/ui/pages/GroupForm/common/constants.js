import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const scheme = yupResolver(yup.object().shape({
    name: yup.string().min(2).max(256).required('Group name is required'),
    permissions: yup.array().min(1)
}));