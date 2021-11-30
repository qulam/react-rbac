const faker = require('faker');

const data = Array(20).fill(1).map(item => ({
    id: faker.datatype.uuid(),
    temporary: faker.datatype.number({min: 0, max: 1000})
}));

module.exports = {
    data
};