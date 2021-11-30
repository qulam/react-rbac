import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/Permission/ui/partials";

import {permissions} from "src/common/context/AccessControl/authorization";

import {PermissionListBody} from "./partials";

const PermissionList = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: [permissions.view_permission]
    });

    return (
        <Body
            pageTitle='Alliance | Permission List'
            isLoading={isRBACLoading}
            isAllowed={isAllowed}
        >
            <PermissionListBody/>
        </Body>
    )
};

export default PermissionList;