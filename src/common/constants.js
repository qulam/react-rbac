export const commonConstants = {
    API_URL: '',
};

export const storageKeys = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    AUTH_USER: 'authUser',
};

export const snackBarProviderConfig = {
    autoHideDuration: 6000,
    maxSnack: 10
};

export const errorStatuses = {
    PERMISSION_DENIED: 403,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
};

export const errorStatusCodes = {
  USER_INACTIVE: 'user_inactive'
};

export const authenticationExemptUrls = [
    '/authentication/login/',
    '/authentication/register/'
];


export const defaultTablePerPagination = [5, 10, 25];

export const formOperations = {
    SAVE: 'SAVE',
    SAVE_AND_CONTINUE_CREATE: 'SAVE_AND_CONTINUE_CREATE',
    SAVE_AND_CONTINUE_EDIT: 'SAVE_AND_CONTINUE_EDIT'
};