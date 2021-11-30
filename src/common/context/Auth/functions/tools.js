export const prepareAuthData = (data) => {
    try {
        const {
            id, first_name, last_name, phone_number, date_of_birth, email,
            groups, user_permissions, is_superuser, is_admin, status
        } = data;
        return {
            personalInfo: {id, first_name, last_name, phone_number, date_of_birth, email},
            authorization: {is_superuser, is_admin, status, groups, user_permissions}
        }
    } catch (e) {
        return null;
    }
};