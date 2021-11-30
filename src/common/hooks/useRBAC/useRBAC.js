import {useEffect, useState, useContext} from "react";
import pt from 'prop-types';

import {AccessControlContext} from "src/common/context/AccessControl";

const useRBAC = ({permissions = []}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);
    const {
        hasPermissions,
        accessControl: {waitForAccessControl}
    } = useContext(AccessControlContext);

    useEffect(() => {
        if (waitForAccessControl) return false;
        const baseAccessControlCondition = hasPermissions(permissions);

        setIsLoading(false);
        setIsAllowed(baseAccessControlCondition);
    }, [waitForAccessControl]);

    return {
        isLoading,
        isAllowed,
    }
};

useRBAC.defaultProps = {
    permissions: [],
};

useRBAC.propTypes = {
    permissions: pt.array,
};

export default useRBAC;