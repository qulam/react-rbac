import {useState} from "react";
import {useQuery} from "react-query";

import {queryKeys} from "src/common/queryKeys";

import {fetchPermissions} from "src/views/Permission/common/api";
import permissionState from "src/views/Permission/common/data/stateCreator";

const usePermission = () => {
    const [queryParams, setQueryParams] = useState(() => permissionState.createEmptyQueryParams());

    const queryParamsManager = (params) => {
        setQueryParams(prevState => ({...prevState, ...params}));
    };

    const fetchPermissionsQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_PERMISSIONS, queryParams],
        queryFn: () => fetchPermissions(queryParams)
    });

    return {
        queries: {
            fetchPermissionsQuery,
        },
        helpers: {
            queryParams,
            queryParamsManager
        },
    };
};

export default usePermission;