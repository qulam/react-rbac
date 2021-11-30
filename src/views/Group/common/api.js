import apiRoutes from "src/common/api/routes";
import {instanceSecureAxios} from "src/common/config/api";

export const fetchGroups = (queryParams) =>
    instanceSecureAxios.get(apiRoutes.AUTHORIZATION_GROUPS(), {params: queryParams}).then(res => res.data);

export const createGroup = (requestData) =>
    instanceSecureAxios.post(apiRoutes.AUTHORIZATION_GROUPS(), requestData).then(res => res.data);

export const updateGroup = ({id, requestPayload}) =>
    instanceSecureAxios.put(apiRoutes.AUTHORIZATION_GROUPS_DETAIL(id), requestPayload).then(res => res.data);

export const fetchGroupDetail = (id) =>
    instanceSecureAxios.get(apiRoutes.AUTHORIZATION_GROUPS_DETAIL(id)).then(res => res.data);

export const deleteGroup = (id) =>
    instanceSecureAxios.delete(apiRoutes.AUTHORIZATION_GROUPS_DETAIL(id)).then(res => res.data);

export const fetchPermissions = (queryParams) =>
    instanceSecureAxios.get(apiRoutes.AUTHORIZATION_PERMISSIONS(), {params: queryParams}).then(res => res.data);