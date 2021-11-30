import axios from 'axios';

import {Storage} from "src/common/services";
import {authenticationExemptUrls, storageKeys} from "../constants";

const detectApiUrl = () => {
    const {REACT_APP_ENVIRONMENT} = process.env;

    switch (REACT_APP_ENVIRONMENT) {
        case 'development':
            return 'http://localhost:8080/';
        case 'beta':
            return 'http://localhost:8000/';
        case 'production':
            return 'https://admin-api.safavy.org/';
        default:
            return '';
    }
};

const instanceAxiosDefault = {
    baseURL: detectApiUrl(),
    timeout: 100000,
}

export const instancePublicAxios = axios.create(instanceAxiosDefault);

export const instanceSecureAxios = axios.create(instanceAxiosDefault);

instanceSecureAxios.interceptors.request.use(
    async config => {
        const accessToken = Storage.getAccessToken();
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

instanceSecureAxios.interceptors.response.use((response) => {
    return response
}, function (error) {

    const configUrl = error.config.url;
    const isPublicEndpoint = authenticationExemptUrls.indexOf(configUrl) !== -1;
    if (error.response.status === 401 && !error.config._retry && !isPublicEndpoint) {
        error.config._retry = true;
        const refreshToken = Storage.getRefreshToken();
        return Storage.getFreshAccessToken(refreshToken)
            .then(res => {
                if (!res.access) {
                    return Promise.reject(error);
                }
                localStorage.setItem(storageKeys.ACCESS, JSON.stringify(res.access));
                error.config.headers.Authorization = 'Bearer ' + res.access;
                return axios.request(error.config);
            });
    }
    return Promise.reject(error);
});