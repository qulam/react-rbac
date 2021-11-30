import {instanceSecureAxios} from "src/common/config/api";
import apiRoutes from "src/common/api/routes";

export const fetchUsers = (queryParams) =>
    instanceSecureAxios.get(apiRoutes.AUTHORIZATION_USERS(), {params: queryParams}).then(res => res.data);

export const createUser = (requestData) =>
    instanceSecureAxios.post(apiRoutes.AUTHORIZATION_USERS(), requestData).then(res => res.data);

export const updateUser = ({id, ...rest}) =>
    instanceSecureAxios.put(apiRoutes.UPDATE_AUTHORIZATION_USERS(id), rest).then(res => res.data);