import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/Group/ui/partials";

import {permissions} from "src/common/context/AccessControl/authorization";

import {GroupListBody} from "./partials";

const GroupList = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: [permissions.view_group]
    });

    return (
        <Body
            pageTitle='Alliance | Group List'
            isLoading={isRBACLoading}
            isAllowed={isAllowed}
        >
            <GroupListBody/>
        </Body>
    )
};

export default GroupList;