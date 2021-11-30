const accessControlState = {
    createEmpty: () => ({
        waitForAccessControl: true,
        is_superuser: false,
        is_admin: false,
        status: false,
        groups: [],
        user_permissions: []
    })
};

export default accessControlState;