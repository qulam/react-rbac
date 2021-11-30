import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/Group/ui/partials";

import {permissions} from "src/common/context/AccessControl/authorization";

import {GroupFormBody} from "./partials";

const GroupForm = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: [permissions.add_group]
    });

    return (
        <Body
            pageTitle='Alliance | Group Form'
            isLoading={isRBACLoading}
            isAllowed={isAllowed}
        >
            <GroupFormBody/>
        </Body>
    )
};

export default GroupForm;