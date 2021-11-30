const jwt = require('jwt-simple');
const constants = require('../constants');

const generateAccessToken = (userObject, type) => jwt.encode({
    ...userObject,
    type,
    publishDate: Date.now()
}, constants.SECRET_KEY);


const parseJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


const checkTokenIsExpired = (token) => {
    const decodedToken = parseJWT(token);
    const {publishDate, type} = decodedToken;
    const tokenPublishDate = new Date(publishDate);
    const currentDate = new Date();
    const diff = (currentDate.getTime() - tokenPublishDate.getTime()) / 1000;

    if (type === constants.tokenTypes.ACCESS) {
        return diff > constants.ACCESS_TOKEN_LIFE_TIME;

    } else if (type === constants.tokenTypes.REFRESH) {
        return diff > constants.REFRESH_TOKEN_LIFE_TIME;

    }
};

module.exports = {
    generateAccessToken,
    parseJWT,
    checkTokenIsExpired
};