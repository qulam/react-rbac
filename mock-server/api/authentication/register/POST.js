const faker = require('faker');
const {delay} = require('connect-api-mocker/helpers');
const usersDb = require('../login/data');

module.exports = [
    delay(200),
    (req, res) => {
        const {first_name, last_name, email, password} = req.body;

        const invalidField = [first_name, last_name, email, password].find(field => field === null || field === '' || field === undefined);

        if (!!invalidField) {
            return res.status(400).send({
                "success": "false",
                "status_code": 400,
                "message": {
                    [invalidField]: [
                        "Invalid request data."
                    ]
                },
                "data": null
            })
        }

        const emailIsUnique = usersDb.admins.find(adminItem => adminItem.email === email) === undefined;

        if (!emailIsUnique) {
            return res.status(400).send({
                "success": "false",
                "status_code": 404,
                "message": {
                    [invalidField]: [
                        "User with this email address already exists."
                    ]
                },
                "data": null
            })
        }

        return res.status(200).send({
            "success": "true",
            "status_code": 200,
            "message": "Your register request successfully sent",
            "data": {
                "id": faker.datatype.uuid(),
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            }
        });
    }
];