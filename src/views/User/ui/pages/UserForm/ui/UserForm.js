import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/User/ui/partials";

import {permissions} from "src/common/context/AccessControl/authorization";

import {UserFormBody} from "./partials";

const UserForm = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: [permissions.add_user]
    });

    return (
        <Body
            pageTitle='Alliance | User Form'
            isLoading={isRBACLoading}
            isAllowed={isAllowed}
        >
            <UserFormBody/>
        </Body>
    )
};

export default UserForm;