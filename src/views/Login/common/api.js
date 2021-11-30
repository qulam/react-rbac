import {instanceSecureAxios} from "src/common/config/api"
import apiRoutes from "src/common/api/routes";

export const authenticationLogin = (credentials) =>
    instanceSecureAxios.post(apiRoutes.AUTHENTICATION_LOGIN(), credentials).then(res => res.data);

export const authenticationFetchProfile = () =>
    instanceSecureAxios.get(apiRoutes.AUTHENTICATION_FETCH_PROFILE()).then(res => res.data);

export const authenticationTokenVerify = (token) =>
    instanceSecureAxios.post(apiRoutes.AUTHENTICATION_TOKEN_VERIFY(), {token}).then(res => res.data);