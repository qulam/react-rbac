const utils = require('../api/authentication/login/utils');

const constants = require('../api/authentication/constants');

const AuthMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const originalUrl = req.originalUrl;

    const isPublicEndpoint = constants.AUTH_EXEMPT_URLS.indexOf(originalUrl) !== -1;

    if (isPublicEndpoint) return next();

    if (!!authorizationHeader) {
        try {
            const token = authorizationHeader.split(' ')[1];
            if (!!token) {
                if (utils.checkTokenIsExpired(token)) {
                    return res.status(401).send({
                        "details": "Token is expired"
                    });
                }
                return next();
            }
            return next();
        } catch (e) {
            return next();
        }
    }
    return next()
};

module.exports = {
    AuthMiddleware
};