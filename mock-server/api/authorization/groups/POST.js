const faker = require("faker");
const {delay} = require('connect-api-mocker/helpers');

const permissionsDb = require('../permissions/data');

module.exports = [
    delay(200),
    (req, res) => {
        const {name, permissions} = req.body;
        if (!name || !permissions || permissions.length === 0) {
            /*all error responses are same structure*/
            return res.status(400).send({
                "name": [
                    "group with this name already exists."
                ]
            });
        }

        const randomPermissions = faker.random.arrayElements(permissionsDb.data);

        return res.status(200).send({
            id: faker.datatype.uuid(),
            name,
            permissions: randomPermissions.map(perm => perm.id),
            permissions_list: faker.random.arrayElements(permissionsDb.data)
        });
    }
];