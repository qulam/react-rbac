const {delay} = require('connect-api-mocker/helpers');
const groupsDb = require('./data');

module.exports = [
    delay(200),
    (req, res) => {
        return res.status(200).send({
            "count": groupsDb.data.length,
            "next": null,
            "previous": null,
            "results": groupsDb.data.slice(0, 10)
        });
    }
];