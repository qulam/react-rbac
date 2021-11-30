const faker = require('faker');

const permissionsDb = require('../permissions/data');

const data = Array(20).fill(1).map((item, idx) => {
    const randomPermissions = faker.random.arrayElements(permissionsDb.data);

    return {
        id: idx + 1,
        name: faker.name.jobTitle(),
        permissions: randomPermissions.map(perm => perm.id),
        permissions_list: randomPermissions
    }
});

module.exports = {
    data
};