const {delay} = require('connect-api-mocker/helpers');
const temporaryDB = require('./data');

module.exports = [
    delay(200),
    (req, res) => {
        return res.send({
            temporaryList: temporaryDB.data,
        });
    }
];