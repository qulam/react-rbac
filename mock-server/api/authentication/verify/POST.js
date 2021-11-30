const {delay} = require('connect-api-mocker/helpers');

const utils = require('../login/utils');
const jwt = require("jwt-simple");
const constants = require("../constants");

module.exports = [
    delay(200),

    (req, res) => {
        const accessToken = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = jwt.decode(accessToken, constants.SECRET_KEY);

            if (utils.checkTokenIsExpired(accessToken)) {
                return res.status(401).send({
                    "detail": "Token is invalid or expired",
                    "code": "token_not_valid"
                });
            }

            return res.send({})
        } catch (e) {
            return res.status(401).send({
                "detail": "Token is invalid or expired",
                "code": "token_not_valid"
            });
        }
    }
];