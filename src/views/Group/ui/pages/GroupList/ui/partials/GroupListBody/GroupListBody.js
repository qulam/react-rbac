import {useContext} from "react";
import {Box, Slide} from "@material-ui/core";

import {View} from "src/components/ui";

import {GroupContext} from "src/views/Group/common/context";

import {GroupListToolbar, GroupListResults} from "../../blocks";

const GroupListBody = () => {
    const {queries: {fetchGroupsQuery}, helpers: {queryParams, queryParamsManager}} = useContext(GroupContext);

    return (
        <View isLoading={fetchGroupsQuery.isLoading}>
            <GroupListToolbar/>
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <GroupListResults
                        dataFlow={fetchGroupsQuery.data}
                        queryParams={queryParams}
                        queryParamsManager={queryParamsManager}
                    />
                </Box>
            </Slide>
        </View>
    );
};

export default GroupListBody;