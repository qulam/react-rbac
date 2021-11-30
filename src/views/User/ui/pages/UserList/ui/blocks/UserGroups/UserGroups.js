import {Typography} from "@material-ui/core";

import {Dialogs, When} from "src/components/ui";
import {Maybe} from "src/common/functions/maybe";

import {GroupsTable} from "src/views/User/ui/pages/UserList/ui/components";

const UserGroups = ({openedUser, closeUserGroups}) => {
    const openedUserGroups = Maybe.isNoneOrEmptyList(openedUser?.groups_list);
    const userFullName = Maybe.isNoneOrEmptyString(`${openedUser?.first_name} ${openedUser?.last_name}`);
    const hasGroups = openedUserGroups.length > 0;

    return (
        <Dialogs.DialogWrapper
            isOpen={!!openedUser}
            onClose={closeUserGroups}
            dialogTitle={`${userFullName.toUpperCase()}'s groups`}
            maxWidth='sm'
            fullWidth={true}>
            <When condition={!hasGroups}>
                <Typography variant='h3' align='center'>
                    {`"${userFullName.toUpperCase()}" user has no any groups yet`}
                </Typography>
            </When>
            <When condition={hasGroups}>
                <GroupsTable groups={openedUserGroups}/>
            </When>

        </Dialogs.DialogWrapper>
    )

};

export default UserGroups;