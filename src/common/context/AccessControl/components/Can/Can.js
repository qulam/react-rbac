import {useContext} from 'react';
import pt from 'prop-types';

import {AccessControlContext} from "src/common/context/AccessControl";

/***
 *
 * @param groups
 * @param permissions
 * @param children
 * @returns {null|*}
 * @constructor
 * @description This component works only children of <AccessControlProvider/> component!
 */
const Can = ({permissions, children}) => {
    const {hasPermissions, isAdmin} = useContext(AccessControlContext);

    if (!isAdmin()) return null;

    const baseCondition = hasPermissions(permissions);

    if (!baseCondition) return null;

    return children;
};

Can.defaultProps = {
    permissions: [],
    isLoading: false,
};

Can.propTypes = {
    permissions: pt.array,
    isLoading: pt.bool
};

export default Can;