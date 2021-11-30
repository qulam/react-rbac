const {delay} = require('connect-api-mocker/helpers');

const database = require('../login/data');
const utils = require('../login/utils');
const constants = require('../constants');

module.exports = [
    delay(200),
    (req, res) => {
        const token = req.body.refresh;
        try {
            const decodedToken = utils.parseJWT(token);
            const {id} = decodedToken;
            const requestUser = database.admins.find(adminItem => adminItem.id === id);

            if (utils.checkTokenIsExpired(token)) {
                return res.status(401).send({
                    detail: "Token is invalid or expired",
                    code: "token_not_valid"
                });
            }

            if (!requestUser || !id) {
                return res.status(401).send({
                    detail: "Token is invalid or expired",
                    code: "token_not_valid"
                })
            }

            const freshAccessToken = utils.generateAccessToken({id: requestUser.id}, constants.tokenTypes.ACCESS);
            return res.send({
                access: freshAccessToken
            });
        } catch (e) {
            return res.status(401).send({
                detail: "Token is invalid or expired",
                code: "token_not_valid"
            });
        }
    }
];