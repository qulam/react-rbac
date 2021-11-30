const {delay} = require('connect-api-mocker/helpers');

module.exports = [
    delay(200),
    (req, res) => {
        const hasError = false;
        const {id} = req.params;
        const {
            first_name,
            last_name,
            email,
            phone_number,
            date_of_birth,
            is_superuser,
            is_admin,
            status,
            groups,
            user_permissions
        } = req.body;

        if (hasError) {
            return res.status(400).send({
                "last_name": [
                    "This field is required."
                ],
                "email": [
                    "User with this email address already exists."
                ]
            });
        }

        return res.status(200).send({
            id,
            first_name,
            last_name,
            email,
            phone_number,
            date_of_birth,
            is_superuser,
            is_admin,
            status,
            groups,
            user_permissions,
            groups_list: [],
            user_permissions_list: []
        });
    }
];