import {instanceSecureAxios} from "src/common/config/api"
import {storageKeys} from "src/common/constants";

export const parseJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const isJson = (item) => {
    if (!item) return item;
    return /^[\],:{}\s]*$/.test(item.replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
};

export const clearInvalidStorage = () => {
    localStorage.removeItem(storageKeys.AUTH_USER);
    localStorage.removeItem(storageKeys.ACCESS);
    localStorage.removeItem(storageKeys.REFRESH);
};

export const setAuthorizationToken = (token) => {
    instanceSecureAxios.defaults.headers.common = {'Authorization': `bearer ${token}`};
};

export const deleteAuthorizationToken = () => {
    if (instanceSecureAxios.defaults.headers.common?.Authorization) {
        delete instanceSecureAxios.defaults.headers.common.Authorization;
    }
};