const {delay} = require('connect-api-mocker/helpers');
const usersDb = require('./data');

module.exports = [
    delay(200),
    (req, res) => {
        return res.status(200).send({
            "count": usersDb.data.length,
            "next": null,
            "previous": null,
            "results": usersDb.data.slice(0, 10)
        });
    }
];