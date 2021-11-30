import {commonConstants} from '../constants';

const apiRoutes = {
    /*Temporary*/
    FETCH_TEMPORARY_LIST: () => `${commonConstants.API_URL}/temporary`,
    /*Authentication && Authorization*/
    AUTHENTICATION_LOGIN: () => `${commonConstants.API_URL}/authentication/login/`,
    AUTHENTICATION_FETCH_PROFILE: () => `${commonConstants.API_URL}/authentication/profile/`,
    AUTHENTICATION_TOKEN_VERIFY: () => `${commonConstants.API_URL}/authentication/verify/`,
    AUTHENTICATION_TOKEN_REFRESH: () => `${commonConstants.API_URL}/authentication/refresh/`,
    AUTHENTICATION_REGISTER: () => `${commonConstants.API_URL}/authentication/register/`,
    AUTHORIZATION_GROUPS: () => `${commonConstants.API_URL}/authorization/groups/`,
    AUTHORIZATION_GROUPS_DETAIL: (pk) => `${commonConstants.API_URL}/authorization/groups/${pk}/`,
    AUTHORIZATION_PERMISSIONS: () => `${commonConstants.API_URL}/authorization/permissions/`,
    AUTHORIZATION_USERS: () => `${commonConstants.API_URL}/authorization/users/`,
    UPDATE_AUTHORIZATION_USERS: (id) => `${commonConstants.API_URL}/authorization/users/${id}/`,
    /*reports*/
    FETCH_REPORTS_AR: () => `${commonConstants.API_URL}/reports/ar/`,
    FETCH_REPORTS_AR_BY_LOCATION: () => `${commonConstants.API_URL}/reports/ar/location/`,
    FETCH_REPORTS_AR_BY_PAYER_GROUP: () => `${commonConstants.API_URL}/reports/ar/payer-group/`,
    FETCH_REPORTS_AR_BY_BALANCE: () => `${commonConstants.API_URL}/reports/ar/balance/`,
    FETCH_REPORTS_AR_BY_COUNT: () => `${commonConstants.API_URL}/reports/ar/count/`,
    FETCH_REPORTS_AR_BY_PROFILES: () => `${commonConstants.API_URL}/reports/ar/profiles/`,
};

export default apiRoutes;