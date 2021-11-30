import {instanceSecureAxios} from "src/common/config/api";
import apiRoutes from "src/common/api/routes";

export const fetchPermissions = (queryParams) =>
    instanceSecureAxios.get(apiRoutes.AUTHORIZATION_PERMISSIONS(), {params: queryParams}).then(res => res.data);