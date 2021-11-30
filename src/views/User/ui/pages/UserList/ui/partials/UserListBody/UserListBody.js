import {useContext} from "react";
import {Box, Slide} from "@material-ui/core";

import {View} from "src/components/ui";

import {UserContext} from "src/views/User/common/context";

import {UserListToolbar, UserListResults} from "../../blocks";

const UserListBody = () => {
    const {queries: {fetchUsersQuery}, helpers: {queryParams, queryParamsManager}} = useContext(UserContext);

    return (
        <View isLoading={fetchUsersQuery.isLoading}>
            <UserListToolbar/>
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <UserListResults
                        dataFlow={fetchUsersQuery.data}
                        queryParams={queryParams}
                        queryParamsManager={queryParamsManager}
                    />
                </Box>
            </Slide>
        </View>
    );
};

export default UserListBody;