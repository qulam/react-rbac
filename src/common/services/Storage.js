import {storageKeys} from "src/common/constants";
import apiRoutes from "src/common/api/routes";
import {Maybe} from "src/common/functions/maybe";
import {instancePublicAxios} from "src/common/config/api";

const Storage = {
    getAccessToken: () => JSON.parse(Maybe.isJsonOrNone(localStorage.getItem(storageKeys.ACCESS))),
    getRefreshToken: () => JSON.parse(Maybe.isJsonOrNone(localStorage.getItem(storageKeys.REFRESH))),
    getAuthUser: () => JSON.parse(Maybe.isJsonOrNone(localStorage.getItem(storageKeys.AUTH_USER))),
    getFreshAccessToken: (refresh) =>
        instancePublicAxios.post(apiRoutes.AUTHENTICATION_TOKEN_REFRESH(), {refresh}).then(res => res.data)
};

export default Storage;