import {instanceSecureAxios} from "src/common/config/api";
import apiRoutes from "src/common/api/routes";

export const authenticationRegister = (requestData) =>
    instanceSecureAxios.post(apiRoutes.AUTHENTICATION_REGISTER(), requestData).then(res => res.data);