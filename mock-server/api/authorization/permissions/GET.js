const {delay} = require('connect-api-mocker/helpers');
const permissionsDb = require('./data');

module.exports = [
    delay(200),
    (req, res) => {
        return res.status(200).send({
            "count": permissionsDb.data.length,
            "next": "http://localhost:8000/authorization/permissions/?limit=10&offset=20",
            "previous": "http://localhost:8000/authorization/permissions/?limit=10&offset=10",
            "results": permissionsDb.data.slice(0, 10)
        });
    }
];