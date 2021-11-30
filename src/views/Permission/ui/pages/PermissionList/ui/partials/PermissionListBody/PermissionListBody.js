import {useContext} from "react";
import {Box, Slide} from "@material-ui/core";

import {View} from 'src/components/ui';

import {PermissionContext} from "src/views/Permission/common/context";

import {PermissionListToolbar, PermissionListResults} from "../../blocks";

const PermissionListBody = () => {
    const {queries: {fetchPermissionsQuery}, helpers: {queryParams, queryParamsManager}} = useContext(PermissionContext);

    return (
        <View isLoading={fetchPermissionsQuery.isLoading}>
            <PermissionListToolbar/>
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <PermissionListResults
                        dataFlow={fetchPermissionsQuery.data}
                        queryParams={queryParams}
                        queryParamsManager={queryParamsManager}
                    />
                </Box>
            </Slide>
        </View>
    )
};

export default PermissionListBody;