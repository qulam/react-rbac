const {delay} = require('connect-api-mocker/helpers');

const database = require('./data');
const utils = require('./utils');
const constants = require("../constants");

module.exports = [
    delay(200),
    (req, res) => {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).send({
                    "email": [
                        "This field may not be blank."
                    ],
                    "password": [
                        "This field may not be blank."
                    ]
                }
            )
        }

        const admin = database.admins.find(adminItem => adminItem.email === email && adminItem.password === password);

        if (!admin) {
            return res.status(401).send({
                "detail": "No active account found with the given credentials"
            });
        }

        const access = utils.generateAccessToken({id: admin.id}, constants.tokenTypes.ACCESS);
        const refresh = utils.generateAccessToken({id: admin.id}, constants.tokenTypes.REFRESH);

        return res.status(200).send({
            access,
            refresh
        });
    }
];