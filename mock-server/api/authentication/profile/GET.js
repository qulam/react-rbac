const {delay} = require('connect-api-mocker/helpers');

const database = require('../login/data');
const tools = require('../login/utils');

module.exports = [
    delay(200),
    (req, res) => {
        const {authorization} = req.headers;
        const accessToken = authorization.split(' ')[1];
        const {id} = tools.parseJWT(accessToken);

        const {password, ...rest} = database.admins.find(adminItem => adminItem.id === id);

        return res.status(200).send({
            success: "true",
            status_code: 200,
            message: "User profile fetched successfully",
            data: rest,
        });
    }
];