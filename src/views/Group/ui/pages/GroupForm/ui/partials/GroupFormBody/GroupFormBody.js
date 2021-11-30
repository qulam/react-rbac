import {Box, Slide} from "@material-ui/core";

import {privateRoutes} from "src/common/mainRoutes";
import {FormToolbar, View} from "src/components/ui";

import {GroupFormBlock} from "../../blocks";

const GroupFormBody = () => {

    return (
        <View isLoading={false}>
            <FormToolbar title='Group creation page' goBackUrl={privateRoutes.AUTHORIZATION_GROUP} />
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <GroupFormBlock/>
                </Box>
            </Slide>
        </View>
    )
};

export default GroupFormBody;