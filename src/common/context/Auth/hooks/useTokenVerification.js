import {useEffect, useContext} from "react";
import {useNavigate} from "react-router";
import {useMutation} from "react-query";

import {queryKeys} from "src/common/queryKeys";
import {AuthContext} from "src/common/context/Auth";
import {publicRoutes} from "src/common/mainRoutes";
import {clearInvalidStorage, deleteAuthorizationToken, setAuthorizationToken} from "src/common/functions/tools";

import {authenticationTokenVerify} from "src/views/Login/common/api";

const useTokenVerification = () => {
    const navigate = useNavigate();
    const {auth: {isAuthenticated, tokenIsValid, access}, setAuth, logout} = useContext(AuthContext);

    const {isLoading, mutate} = useMutation({
        mutationKey: [queryKeys.AUTHENTICATION_TOKEN_VERIFY, access],
        mutationFn: authenticationTokenVerify,
        onSuccess: () => {
            setAuthorizationToken(access);
            setAuth(prevState => ({...prevState, isAuthenticated: true, tokenIsValid: true, access}))
        },
        onError: () => logout()
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(publicRoutes.REGISTER);
            clearInvalidStorage();
            deleteAuthorizationToken();
            return false;
        }

        mutate(access)
    }, []);

    return {
        isLoading,
        tokenIsValid,
    }

};

export default useTokenVerification;