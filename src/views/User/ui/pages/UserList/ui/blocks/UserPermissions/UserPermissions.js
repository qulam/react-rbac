import {Typography} from "@material-ui/core";

import {Dialogs, When} from "src/components/ui";
import {Maybe} from "src/common/functions/maybe";

import {PermissionsTable} from "src/views/User/ui/pages/UserList/ui/components";

const UserPermissions = ({openedUser, closeUserPermissions}) => {
    const openedUserPermissions = Maybe.isNoneOrEmptyList(openedUser?.user_permissions_list);
    const userFullName = Maybe.isNoneOrEmptyString(`${openedUser?.first_name} ${openedUser?.last_name}`);
    const hasPermissions = openedUserPermissions.length > 0;

    return (
        <Dialogs.DialogWrapper
            isOpen={!!openedUser}
            onClose={closeUserPermissions}
            dialogTitle={`${userFullName.toUpperCase()}'s permissions`}
            maxWidth='md'
            fullWidth={true}>
            <When condition={!hasPermissions}>
                <Typography variant='h2' align='center'>
                    {`"${userFullName.toUpperCase()}" user has no any permission yet`}
                </Typography>
            </When>
            <When condition={hasPermissions}>
                <PermissionsTable permissions={openedUserPermissions}/>
            </When>

        </Dialogs.DialogWrapper>
    )

};

export default UserPermissions;