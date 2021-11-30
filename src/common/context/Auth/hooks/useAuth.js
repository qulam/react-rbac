import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {useSnackbar} from 'notistack';

import {queryKeys} from "src/common/queryKeys";
import {errorStatusCodes, storageKeys} from "src/common/constants";
import {privateRoutes, publicRoutes} from "src/common/mainRoutes";
import {AccessControlContext} from "src/common/context/AccessControl";
import {
    clearInvalidStorage,
    deleteAuthorizationToken,
    setAuthorizationToken
} from "src/common/functions/tools";
import authState from "src/common/context/Auth/data/stateCreator";
import {prepareAuthData} from "src/common/context/Auth/functions/tools";
import {authenticationFetchProfile, authenticationLogin} from "src/views/Login/common/api";
import {authenticationRegister} from "src/views/Register/common/api";


const useAuth = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const {setAccessControl} = useContext(AccessControlContext);
    const [auth, setAuth] = useState(() => authState.createEmptyAuth());

    const logout = () => {
        clearInvalidStorage();
        deleteAuthorizationToken();
        setAuth(() => authState.createEmptyAuth());
        navigate(publicRoutes.LOGIN);
    };

    const authenticationFetchProfileQuery = useQuery({
        queryKey: [queryKeys.AUTHENTICATION_FETCH_PROFILE, auth.access, auth.refresh],
        queryFn: authenticationFetchProfile,
        enabled: !!auth.access && !!auth.refresh && !!auth.isAuthenticated && !!auth.tokenIsValid,
        staleTime: Infinity,
        cacheTime: Infinity,
        onSuccess: response => {
            const preparedAuthData = prepareAuthData(response.data);
            if (!preparedAuthData) logout();

            localStorage.setItem(storageKeys.AUTH_USER, JSON.stringify(preparedAuthData.personalInfo));
            setAuth(prevState => ({...prevState, profile: preparedAuthData.personalInfo}));
            setAccessControl({...preparedAuthData.authorization, waitForAccessControl: false});
        },
        onError: err => {
            if (!!err.response.data.code && err.response.data.code === errorStatusCodes.USER_INACTIVE) {
                enqueueSnackbar(err.response.data.detail, {variant: 'error'});
            } else {
                enqueueSnackbar(err.response.data.details, {variant: 'error'});
            }
            logout();
        }
    });

    const authenticationLoginMutation = useMutation({
        mutationKey: queryKeys.AUTHENTICATION_LOGIN,
        mutationFn: authenticationLogin,
        onSuccess: ({access, refresh}) => {
            setAuthorizationToken(access);
            localStorage.setItem(storageKeys.ACCESS, JSON.stringify(access));
            localStorage.setItem(storageKeys.REFRESH, JSON.stringify(refresh));
            setAuth(prevState => ({...prevState, isAuthenticated: true, access, refresh}));
            navigate(privateRoutes.DASHBOARD);
        },
        onError: error => {
            enqueueSnackbar(error.response.data.detail, {variant: 'error'});
            logout();
        }
    });

    const authenticationRegisterMutation = useMutation({
        mutationKey: queryKeys.AUTHENTICATION_REGISTER,
        mutationFn: authenticationRegister,
        onSuccess: data => {
            enqueueSnackbar(data.message, {variant: 'success'});
            navigate(publicRoutes.LOGIN);
        },
        onError: error => {
            try {
                const errorMessage = Object.values(error.response.data.message)[0][0];
                enqueueSnackbar(errorMessage, {variant: 'error'});
            } catch {
                enqueueSnackbar('An error occurred when you send register request', {variant: 'error'});
            }
        }
    });

    const login = (credentials) => {
        if (authenticationLoginMutation.isLoading) return false;
        authenticationLoginMutation.mutate(credentials);
    };

    const register = (userData) => {
        if (authenticationRegisterMutation.isLoading) return false;
        authenticationRegisterMutation.mutate(userData)
    };

    return {
        auth,
        setAuth,
        logout,
        login: {
            execute: login,
            mutation: authenticationLoginMutation
        },
        register: {
            execute: register,
            mutation: authenticationRegisterMutation
        },
        profile: {
            query: authenticationFetchProfileQuery
        }
    }
};

export default useAuth;