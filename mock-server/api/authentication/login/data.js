const faker = require('faker');

const admins = [
    {
        id: 1,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber(),
        date_of_birth: faker.date.past(),
        email: 'superadmin@developer.dev',
        password: 'alliance123',
        is_superuser: true,
        is_admin: true,
        status: true,
        groups: [],
        user_permissions: []
    },
    {
        id: 2,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber(),
        date_of_birth: faker.date.past(),
        email: 'moderator@developer.dev',
        password: 'alliance123',
        is_superuser: false,
        is_admin: true,
        status: true,
        groups: [
            {
                id: 1,
                name: "Moderator",
                permissions: [1, 2, 3, 4, 9, 10, 11, 12, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                permissions_list: [
                    {
                        "id": 1,
                        "codename": "add_logentry",
                        "name": "Can add log entry"
                    },
                    {
                        "id": 2,
                        "codename": "change_logentry",
                        "name": "Can change log entry"
                    },
                    {
                        "id": 3,
                        "codename": "delete_logentry",
                        "name": "Can delete log entry"
                    },
                    {
                        "id": 4,
                        "codename": "view_logentry",
                        "name": "Can view log entry"
                    },
                    {
                        "id": 9,
                        "codename": "add_group",
                        "name": "Can add group"
                    },
                    {
                        "id": 10,
                        "codename": "change_group",
                        "name": "Can change group"
                    },
                    {
                        "id": 11,
                        "codename": "delete_group",
                        "name": "Can delete group"
                    },
                    {
                        "id": 12,
                        "codename": "view_group",
                        "name": "Can view group"
                    },
                    {
                        "id": 5,
                        "codename": "add_permission",
                        "name": "Can add permission"
                    },
                    {
                        "id": 6,
                        "codename": "change_permission",
                        "name": "Can change permission"
                    },
                    {
                        "id": 7,
                        "codename": "delete_permission",
                        "name": "Can delete permission"
                    },
                    {
                        "id": 8,
                        "codename": "view_permission",
                        "name": "Can view permission"
                    },
                    {
                        "id": 13,
                        "codename": "add_contenttype",
                        "name": "Can add content type"
                    },
                    {
                        "id": 14,
                        "codename": "change_contenttype",
                        "name": "Can change content type"
                    },
                    {
                        "id": 15,
                        "codename": "delete_contenttype",
                        "name": "Can delete content type"
                    },
                    {
                        "id": 16,
                        "codename": "view_contenttype",
                        "name": "Can view content type"
                    },
                    {
                        "id": 17,
                        "codename": "add_session",
                        "name": "Can add session"
                    },
                    {
                        "id": 18,
                        "codename": "change_session",
                        "name": "Can change session"
                    },
                    {
                        "id": 19,
                        "codename": "delete_session",
                        "name": "Can delete session"
                    },
                    {
                        "id": 20,
                        "codename": "view_session",
                        "name": "Can view session"
                    },
                    {
                        "id": 21,
                        "codename": "add_user",
                        "name": "Can add User"
                    },
                    {
                        "id": 22,
                        "codename": "change_user",
                        "name": "Can change User"
                    },
                    {
                        "id": 23,
                        "codename": "delete_user",
                        "name": "Can delete User"
                    },
                    {
                        "id": 24,
                        "codename": "view_user",
                        "name": "Can view User"
                    }
                ]
            }
        ],
        user_permissions: [
            {
                "id": 1,
                "codename": "add_logentry",
                "name": "Can add log entry"
            },
            {
                "id": 2,
                "codename": "change_logentry",
                "name": "Can change log entry"
            },
            {
                "id": 3,
                "codename": "delete_logentry",
                "name": "Can delete log entry"
            },
            {
                "id": 4,
                "codename": "view_logentry",
                "name": "Can view log entry"
            },
            {
                "id": 9,
                "codename": "add_group",
                "name": "Can add group"
            },
            {
                "id": 10,
                "codename": "change_group",
                "name": "Can change group"
            },
            {
                "id": 11,
                "codename": "delete_group",
                "name": "Can delete group"
            },
            {
                "id": 12,
                "codename": "view_group",
                "name": "Can view group"
            },
            {
                "id": 5,
                "codename": "add_permission",
                "name": "Can add permission"
            },
            {
                "id": 6,
                "codename": "change_permission",
                "name": "Can change permission"
            },
            {
                "id": 7,
                "codename": "delete_permission",
                "name": "Can delete permission"
            },
            {
                "id": 8,
                "codename": "view_permission",
                "name": "Can view permission"
            },
            {
                "id": 13,
                "codename": "add_contenttype",
                "name": "Can add content type"
            },
            {
                "id": 14,
                "codename": "change_contenttype",
                "name": "Can change content type"
            },
            {
                "id": 15,
                "codename": "delete_contenttype",
                "name": "Can delete content type"
            },
            {
                "id": 16,
                "codename": "view_contenttype",
                "name": "Can view content type"
            },
            {
                "id": 17,
                "codename": "add_session",
                "name": "Can add session"
            },
            {
                "id": 18,
                "codename": "change_session",
                "name": "Can change session"
            },
            {
                "id": 19,
                "codename": "delete_session",
                "name": "Can delete session"
            },
            {
                "id": 20,
                "codename": "view_session",
                "name": "Can view session"
            },
            {
                "id": 21,
                "codename": "add_user",
                "name": "Can add User"
            },
            {
                "id": 22,
                "codename": "change_user",
                "name": "Can change User"
            },
            {
                "id": 23,
                "codename": "delete_user",
                "name": "Can delete User"
            },
            {
                "id": 24,
                "codename": "view_user",
                "name": "Can view User"
            }
        ]
    },
    {
        id: 3,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber(),
        date_of_birth: faker.date.past(),
        email: 'User@developer.dev',
        password: 'alliance123',
        is_superuser: false,
        is_admin: true,
        status: true,
        groups: [
            {
                id: 2,
                name: "User",
                permissions: [24,],
                permissions_list: [
                    {
                        id: 24,
                        codename: "view_group",
                        name: "Can view group"
                    }
                ]
            }
        ],
        user_permissions: [
            {
                id: 24,
                codename: "view_group",
                name: "Can view group"
            }
        ]
    },
];

module.exports = {
    admins
};