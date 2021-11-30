import {Box, Slide} from "@material-ui/core";

import {privateRoutes} from "src/common/mainRoutes";
import {FormToolbar, View} from "src/components/ui";

import {UserFormBlock} from "../../blocks";

const UserFormBody = () => {

    return (
        <View isLoading={false}>
            <FormToolbar title='User creation page' goBackUrl={privateRoutes.USER} />
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <UserFormBlock/>
                </Box>
            </Slide>
        </View>
    )
};

export default UserFormBody;