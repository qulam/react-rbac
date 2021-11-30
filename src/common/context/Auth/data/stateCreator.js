import {Storage} from "src/common/services";

const authState = {
    createEmptyAuth: () => {
        const access = Storage.getAccessToken();
        const refresh = Storage.getRefreshToken();
        return {
            isAuthenticated: !!access && !!refresh,
            tokenIsValid: false,
            access,
            refresh,
            profile: {
                id: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                date_of_birth: '',
                email: '',
            },
        }
    }
};

export default authState;