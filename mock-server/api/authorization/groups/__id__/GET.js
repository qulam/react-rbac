const faker = require("faker");
const {delay} = require('connect-api-mocker/helpers');

const permissionsDb = require('../../permissions/data');

module.exports = [
    delay(200),
    (req, res) => {
        const randomPermissions = faker.random.arrayElements(permissionsDb.data);

        return res.status(200).send({
            id: faker.datatype.uuid(),
            name: faker.name.jobTitle(),
            permissions: randomPermissions.map(perm => perm.id),
            permissions_list: faker.random.arrayElements(permissionsDb.data)
        });
    }
];