const {delay} = require("connect-api-mocker/helpers");

module.exports = [
    delay(200),
    (req, res) => {
        const isError = false;

        if (isError) {
            return res.status(404).send({
                detail: "Not found."
            });
        }

        return res.status(204).send();
    }
];