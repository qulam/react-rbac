import {Typography} from "@material-ui/core";

import {Dialogs, When} from "src/components/ui";
import {Maybe} from "src/common/functions/maybe";

import {PermissionsTable} from "src/views/Group/ui/pages/GroupList/ui/components";

const GroupPermissions = ({openedGroup, closeGroupPermissions}) => {
    const openedGroupPermissions = Maybe.isNoneOrEmptyList(openedGroup?.permissions_list);
    const groupName = Maybe.isNoneOrEmptyString(openedGroup?.name);
    const hasPermissions = openedGroupPermissions.length > 0;


    return (
        <Dialogs.DialogWrapper
            isOpen={!!openedGroup}
            onClose={closeGroupPermissions}
            dialogTitle={groupName.toUpperCase()}
            maxWidth='md'
            fullWidth={true}>
            <When condition={!hasPermissions}>
                <Typography
                    variant='h2'
                    align='center'>{`"${groupName.toUpperCase()}" group has no any permission yet`}
                </Typography>
            </When>
            <When condition={hasPermissions}>
                <PermissionsTable permissions={openedGroupPermissions}/>
            </When>
        </Dialogs.DialogWrapper>
    )
}

export default GroupPermissions;