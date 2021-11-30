import {useState} from "react";
import _ from 'lodash';

import accessControlState from "src/common/context/AccessControl/data/stateCreator";

const useAccessControl = () => {
    const [accessControl, setAccessControl] = useState(() => accessControlState.createEmpty());

    const isActive = () => accessControl.status;

    const isSuperUser = () => accessControl.is_superuser;

    const isAdmin = () => accessControl.is_superuser || accessControl.is_admin;

    const getGroups = () => accessControl.groups;

    const getPermissions = () => accessControl.user_permissions;

    const hasGroups = (allowedGroups = []) => {
        if (!isActive()) return false;

        if (isSuperUser()) return true;

        if (_.isEmpty(allowedGroups)) return false;

        const authUserGroups = getGroups();
        if (_.isEmpty(authUserGroups)) return false;

        const authUserGroupsPrimaryKeys = authUserGroups.map(groupItem => groupItem.id);
        const intersectionBtwUGAndAllowedGroups = _.intersection(authUserGroupsPrimaryKeys, allowedGroups);

        return !_.isEmpty(intersectionBtwUGAndAllowedGroups);
    };

    const hasPermissions = (allowedPerms = []) => {
        if (!isActive()) return false;

        if (isSuperUser()) return true;

        if (allowedPerms.indexOf('*') !== -1) return true;

        if (_.isEmpty(allowedPerms)) return false;

        const authUserPerms = getPermissions();
        const authUserGroups = getGroups();

        if (_.isEmpty(authUserPerms) && _.isEmpty(authUserGroups)) return false;

        const authUserPermsPrimaryKeys = authUserPerms.map(permItem => permItem.codename);
        const intersectionBtwUPAndAllowedPerms = _.intersection(authUserPermsPrimaryKeys, allowedPerms);

        const authUserGroupsPermsFlatCodes = authUserGroups.map(groupItem => groupItem.permissions_list).flat().map(permItem => permItem.codename);

        const authUserGroupsPermsFlatCodesSet = new Set(authUserGroupsPermsFlatCodes);
        const intersectionBtwFlatCodesAndAllowedPerms = _.intersection([...authUserGroupsPermsFlatCodesSet], allowedPerms);
        return !_.isEmpty(intersectionBtwUPAndAllowedPerms) || !_.isEmpty(intersectionBtwFlatCodesAndAllowedPerms);
    };

    const setGroups = (groupsList = []) =>
        setAccessControl(prevState => ({
            ...prevState,
            groups: [...prevState.groups, ...groupsList]
        }));

    const setPermissions = (permissionsList) =>
        setAccessControl(prevState => ({
            ...prevState,
            user_permissions: [...prevState.user_permissions, ...permissionsList]
        }));

    return {
        accessControl,
        setAccessControl,
        hasGroups,
        setGroups,
        getGroups,
        hasPermissions,
        setPermissions,
        getPermissions,
        isActive,
        isAdmin,
        isSuperUser
    };
};

export default useAccessControl;