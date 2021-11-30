import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useNavigate, useParams} from "react-router";
import {useSnackbar} from "notistack";

import {queryKeys} from "src/common/queryKeys";
import {formOperations} from "src/common/constants";
import {privateRoutes} from "src/common/mainRoutes";
import {createGroup, deleteGroup, fetchGroupDetail, updateGroup} from "src/views/Group/common/api";

import {fetchGroups} from "src/views/Group/common/api";
import groupState from "src/views/Group/common/data/stateCreator";

const useGroup = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {enqueueSnackbar} = useSnackbar();
    const {id} = useParams();

    const [queryParams, setQueryParams] = useState(() => groupState.createEmptyQueryParams());

    const queryParamsManager = (params) => {
        setQueryParams(prevState => ({...prevState, ...params}));
    };

    const fetchGroupsQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_GROUPS, queryParams],
        queryFn: () => fetchGroups(queryParams)
    });

    const fetchGroupDetailQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_GROUPS_DETAIL, id],
        queryFn: () => fetchGroupDetail(id),
        staleTime: 0,
        cacheTime: 0,
        enabled: !!id
    });

    const createGroupMutation = useMutation({
        mutationKey: queryKeys.AUTHORIZATION_GROUPS_CREATE,
        mutationFn: createGroup
    });

    const updateGroupMutation = useMutation({
        mutationKey: queryKeys.AUTHORIZATION_GROUPS_UPDATE,
        mutationFn: updateGroup
    });

    const deleteGroupMutation = useMutation({
        mutationKey: queryKeys.AUTHORIZATION_GROUPS_DELETE,
        mutationFn: deleteGroup,
        onSuccess: () => {
            enqueueSnackbar('Blog successfully deleted', {variant: 'success'});
            queryClient.invalidateQueries(queryKeys.AUTHORIZATION_GROUPS);
        },
        onError: error => {
            enqueueSnackbar(error.response.data.detail, {variant: 'error'});
        }
    });

    const saveGroupFormFactory = ({operation, data, reset}) => {
        switch (operation) {
            case formOperations.SAVE:
                queryClient.invalidateQueries(queryKeys.AUTHORIZATION_GROUPS);
                setTimeout(() => navigate(privateRoutes.AUTHORIZATION_GROUP), 100);
                break;
            case formOperations.SAVE_AND_CONTINUE_CREATE:
                reset();
                break;
            case formOperations.SAVE_AND_CONTINUE_EDIT:
                setTimeout(() => navigate(`${privateRoutes.AUTHORIZATION_GROUP_FORM}/${data.id}`), 100);
                break;
            default:
                return false;
        }
    };

    const saveGroupHandler = ({requestData, operation, reset, callback = null}) => {
        const {name, permissions} = requestData;
        const requestPayload = {
            name,
            permissions: permissions.map(permissionItem => permissionItem.id)
        };

        if (!!id) {
            updateGroupMutation.mutate({id, requestPayload}, {
                onSuccess: data => {
                    enqueueSnackbar('Group successfully update', {variant: 'success'});
                    saveGroupFormFactory({operation, data, reset});
                    !!callback && callback();
                },
                onError: error => {
                    try {
                        const errorMessage = Object.values(error.response.data)[0];
                        enqueueSnackbar(errorMessage, {variant: 'error'});
                    } catch {
                        enqueueSnackbar('An error occurred when you send update group request', {variant: 'error'});
                    }
                }
            });
        } else {
            createGroupMutation.mutate(requestPayload, {
                onSuccess: data => {
                    enqueueSnackbar('Group successfully created', {variant: 'success'});
                    saveGroupFormFactory({operation, data, reset});
                    !!callback && callback();
                },
                onError: error => {
                    try {
                        const errorMessage = Object.values(error.response.data)[0];
                        enqueueSnackbar(errorMessage, {variant: 'error'});
                    } catch {
                        enqueueSnackbar('An error occurred when you send create group request', {variant: 'error'});
                    }
                }
            });
        }
    };

    return {
        isNewRecord: !id,
        queries: {
            fetchGroupsQuery,
            fetchGroupDetailQuery,
        },
        helpers: {
            queryParams,
            queryParamsManager
        },
        create: {
            createGroupMutation,
            saveGroupHandler
        },
        delete: {
            deleteGroupMutation
        }
    };
};

export default useGroup;