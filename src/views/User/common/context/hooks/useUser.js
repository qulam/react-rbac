import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useParams, useNavigate} from "react-router";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";

import {queryKeys} from "src/common/queryKeys";
import {formOperations} from "src/common/constants";
import {privateRoutes} from "src/common/mainRoutes";

import {createUser, fetchUsers, updateUser} from "src/views/User/common/api";
import userState from "src/views/User/common/data/stateCreator";
import moment from "moment";

const useUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {enqueueSnackbar} = useSnackbar();
    const {id} = useParams();

    const [queryParams, setQueryParams] = useState(() => userState.createEmptyQueryParams());

    const queryParamsManager = (params) => {
        setQueryParams(prevState => ({...prevState, ...params}));
    };

    const fetchUsersQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_USERS, queryParams],
        queryFn: () => fetchUsers(queryParams),
        staleTime: 0,
        cacheTime: 0
    });

    const createUserMutation = useMutation({
        mutationKey: queryKeys.AUTHORIZATION_USERS_CREATE,
        mutationFn: createUser
    });

    const updateUserMutation = useMutation({
        mutationKey: queryKeys.AUTHORIZATION_USERS_UPDATE,
        mutationFn: updateUser
    });

    const changeUserStatus = (updatedUser) => {
        updateUserMutation.mutate(updatedUser, {
            onSuccess: () => {
                enqueueSnackbar('User successfully updated', {variant: 'success'});
                queryClient.invalidateQueries(queryKeys.AUTHORIZATION_USERS);
            },
            onError: () => {
                enqueueSnackbar('An error occurred when send user update request', {variant: 'error'});
            }
        })
    };

    const saveUserFormFactory = ({operation, data, reset}) => {
        switch (operation) {
            case formOperations.SAVE:
                queryClient.invalidateQueries(queryKeys.AUTHORIZATION_USERS);
                setTimeout(() => navigate(privateRoutes.USER), 100);
                break;
            case formOperations.SAVE_AND_CONTINUE_CREATE:
                reset();
                break;
            case formOperations.SAVE_AND_CONTINUE_EDIT:
                setTimeout(() => navigate(`${privateRoutes.USER_FORM}/${data.id}`), 100);
                break;
            default:
                return false;
        }
    };

    const saveUserHandler = ({requestData, operation, reset, callback = null}) => {
        const {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            date_of_birth,
            groups,
            user_permissions,
            is_superuser,
            is_admin,
            status
        } = requestData;
        const requestPayload = {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            date_of_birth: moment(date_of_birth).format('YYYY-MM-DD'),
            is_superuser,
            is_admin,
            status,
            groups: groups.map(groupItem => groupItem.id),
            user_permissions: user_permissions.map(permItem => permItem.id),
        };

        if (!!id) {
            updateUserMutation.mutate({id, requestPayload}, {
                onSuccess: data => {
                    enqueueSnackbar('User successfully update', {variant: 'success'});
                    saveUserFormFactory({operation, data, reset});
                    !!callback && callback();
                },
                onError: error => {
                    try {
                        const errorMessage = Object.values(error.response.data)[0];
                        enqueueSnackbar(errorMessage, {variant: 'error'});
                    } catch {
                        enqueueSnackbar('An error occurred when you send update user request', {variant: 'error'});
                    }
                }
            });
        } else {
            createUserMutation.mutate(requestPayload, {
                onSuccess: data => {
                    enqueueSnackbar('User successfully created', {variant: 'success'});
                    saveUserFormFactory({operation, data, reset});
                    !!callback && callback();
                },
                onError: error => {
                    try {
                        Object.values(error.response.data).forEach(errorItem => {
                            enqueueSnackbar(errorItem, {variant: 'error'});
                        });
                    } catch {
                        enqueueSnackbar('An error occurred when you send create user request', {variant: 'error'});
                    }
                }
            });
        }
    };


    return {
        isNewRecord: !id,
        queries: {
            fetchUsersQuery,
            fetchUserDetailQuery: {isLoading: false, data: null}
        },
        create: {
            saveUserHandler,
            createUserMutation
        },
        update: {
            updateUserMutation,
            changeUserStatus,
        },
        delete: {
            deleteUserMutation: {mutate: () => null, isLoading: false}
        },
        helpers: {
            queryParams,
            queryParamsManager
        },
    }
};

export default useUser;