const SECRET_KEY = 'happyhacks';
const ACCESS_TOKEN_LIFE_TIME = 120;
const REFRESH_TOKEN_LIFE_TIME = 6000;
const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh'
};

const AUTH_EXEMPT_URLS = [
    '/authentication/login',
    '/authentication/verify',
    '/authentication/refresh',
]

module.exports = {
    SECRET_KEY,
    ACCESS_TOKEN_LIFE_TIME,
    REFRESH_TOKEN_LIFE_TIME,
    AUTH_EXEMPT_URLS,
    tokenTypes
}