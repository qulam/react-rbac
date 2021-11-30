export const PUBLIC_PATH = '';
export const PRIVATE_PATH = '/app';

export const publicRoutes = {
    LOGIN: `${PUBLIC_PATH}/authentication/login`,
    REGISTER: `${PUBLIC_PATH}/authentication/register`,
    PAGE_404: `${PUBLIC_PATH}/404`,
    ROOT: `${PUBLIC_PATH}/`
};

export const privateRoutes = {
    DASHBOARD: `${PRIVATE_PATH}/dashboard`,
    USER: `${PRIVATE_PATH}/user`,
    USER_FORM: `${PRIVATE_PATH}/user/form`,
    AUTHORIZATION_GROUP: `${PRIVATE_PATH}/group`,
    AUTHORIZATION_GROUP_FORM: `${PRIVATE_PATH}/group/form`,
    AUTHORIZATION_PERMISSIONS: `${PRIVATE_PATH}/permission`,
    SETTINGS: `${PRIVATE_PATH}/settings`,
    PAGE_403: `${PUBLIC_PATH}/403`,
};