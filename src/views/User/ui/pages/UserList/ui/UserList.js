import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/User/ui/partials";

import {permissions} from "src/common/context/AccessControl/authorization";

import {UserListBody} from "./partials";

const UserList = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: [permissions.view_user]
    });

    return (
        <Body
            pageTitle='Alliance | User List'
            isLoading={isRBACLoading}
            isAllowed={isAllowed}
        >
            <UserListBody/>
        </Body>
    )
};

export default UserList;