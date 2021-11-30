import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox, IconButton, Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';

import {
    Edit as EditIcon,
    Trash as TrashIcon,
    UserPlus as UserPlusIcon,
    GitPullRequest as GitPullRequestIcon
} from 'react-feather';

import {Maybe} from "src/common/functions/maybe";
import {privateRoutes} from "src/common/mainRoutes";
import {defaultTablePerPagination} from "src/common/constants";
import {Can} from "src/common/context/AccessControl/components";
import {permissions} from "src/common/context/AccessControl/authorization";

import {UserContext} from "src/views/User/common/context";
import {changeUserActionTypes} from "src/views/User/common/constants";
import {DeleteUserConfirmation} from "src/views/User/ui/pages/UserList/ui/components";

import {UserPermissions, UserGroups} from "../index";

const renderStatus = ({condition, row, changeUserStatusFactory, actionType, isDisabled}) => {
    return (
        <Switch
            disabled={isDisabled}
            checked={!!condition}
            onChange={() => changeUserStatusFactory(row, actionType)}
        />
    )
};

const UserListResults = ({dataFlow, queryParams, queryParamsManager, ...rest}) => {
    const {
        delete: {
            deleteUserMutation
        },
        update: {
            updateUserMutation,
            changeUserStatus
        }
    } = useContext(UserContext);

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
    const [userPermissions, setUserPermissions] = useState(null);
    const [userGroups, setUserGroups] = useState(null);

    const dataFlowList = Maybe.isNoneOrEmptyList(dataFlow.results);

    const handleSelectAll = (event) => {
        let newSelectedRowIds;

        if (event.target.checked) {
            newSelectedRowIds = dataFlowList.map((row) => row.id);
        } else {
            newSelectedRowIds = [];
        }

        setSelectedRowIds(newSelectedRowIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedRowIds.indexOf(id);
        let newSelectedRowIds = [];

        if (selectedIndex === -1) {
            newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds, id);
        } else if (selectedIndex === 0) {
            newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds.slice(1));
        } else if (selectedIndex === selectedRowIds.length - 1) {
            newSelectedRowIds = newSelectedRowIds.concat(selectedRowIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedRowIds = newSelectedRowIds.concat(
                selectedRowIds.slice(0, selectedIndex),
                selectedRowIds.slice(selectedIndex + 1)
            );
        }

        setSelectedRowIds(newSelectedRowIds);
    };

    const closeUserPermissions = () => setUserPermissions(null);
    const closeUserGroups = () => setUserGroups(null);

    const changePageHandler = (event, newPage) => queryParamsManager({offset: newPage * queryParams.limit});

    const changePerPageHandler = (e) => queryParamsManager({limit: e.target.value, offset: 0});

    const closeDeleteRowConfirmation = () => setSelectedRowToDelete(null);

    const deleteRow = () => !!selectedRowToDelete && deleteUserMutation.mutate(selectedRowToDelete);

    const changeUserStatusFactory = (user, actionType) => {
        if (updateUserMutation.isLoading) return false;

        switch (actionType) {
            case changeUserActionTypes.SET_SUPERUSER:
                return changeUserStatus({...user, is_superuser: !user.is_superuser});
            case changeUserActionTypes.SET_ADMIN:
                return changeUserStatus({...user, is_admin: !user.is_admin});
            case changeUserActionTypes.SET_STATUS:
                return changeUserStatus({...user, status: !user.status});
            default:
                return false;
        }
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{minWidth: 1050}}>
                    <Table>
                        <TableHead>

                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedRowIds.length === dataFlowList.length}
                                        color="primary"
                                        indeterminate={
                                            selectedRowIds.length > 0
                                            && selectedRowIds.length < dataFlowList.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    First name
                                </TableCell>
                                <TableCell>
                                    Last name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Phone number
                                </TableCell>
                                <TableCell>
                                    Date of birth
                                </TableCell>
                                <TableCell>
                                    Groups
                                </TableCell>
                                <TableCell>
                                    Permissions
                                </TableCell>
                                <TableCell>
                                    Is superuser
                                </TableCell>
                                <TableCell>
                                    Is admin
                                </TableCell>
                                <TableCell>
                                    Is active
                                </TableCell>
                                <Can permissions={[permissions.delete_group, permissions.change_group]}>
                                    <TableCell style={{width: 140}}>
                                        Actions
                                    </TableCell>
                                </Can>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataFlowList.map((row) => (
                                <TableRow
                                    hover
                                    key={row.id}
                                    selected={selectedRowIds.indexOf(row.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRowIds.indexOf(row.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, row.id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.first_name}</TableCell>
                                    <TableCell>{row.last_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{Maybe.isNoneOrHyphens(row.phone_number)}</TableCell>
                                    <TableCell>{Maybe.isNoneOrHyphens(row.date_of_birth)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setUserGroups(row)}>
                                            <UserPlusIcon strokeWidth={1.5} size={18}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setUserPermissions(row)}>
                                            <GitPullRequestIcon strokeWidth={1.5} size={18}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        {renderStatus({
                                            condition: row.is_superuser,
                                            row,
                                            changeUserStatusFactory,
                                            actionType: changeUserActionTypes.SET_SUPERUSER,
                                            isDisabled: false
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {renderStatus({
                                            condition: row.is_admin,
                                            row,
                                            changeUserStatusFactory,
                                            actionType: changeUserActionTypes.SET_ADMIN,
                                            isDisabled: false
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {renderStatus({
                                            condition: row.status,
                                            row,
                                            changeUserStatusFactory,
                                            actionType: changeUserActionTypes.SET_STATUS,
                                            isDisabled: false
                                        })}
                                    </TableCell>
                                    <Can permissions={[permissions.delete_user, permissions.change_user]}>
                                        <TableCell>
                                            <Can permissions={[permissions.change_user]}>
                                                <Link to={`${privateRoutes.AUTHORIZATION_GROUP_FORM}/${row.id}`}>
                                                    <IconButton aria-label='edit'>
                                                        <EditIcon strokeWidth={1.5} size={18}/>
                                                    </IconButton>
                                                </Link>
                                            </Can>
                                            <Can permissions={[permissions.delete_user]}>
                                                <IconButton
                                                    aria-label='delete'
                                                    onClick={() => setSelectedRowToDelete(row.id)}
                                                    disabled={deleteUserMutation.isLoading}
                                                >
                                                    <TrashIcon strokeWidth={1.5} size={18}/>
                                                </IconButton>
                                            </Can>
                                        </TableCell>
                                    </Can>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={dataFlow.count}
                onPageChange={changePageHandler}
                onRowsPerPageChange={changePerPageHandler}
                page={queryParams.offset / queryParams.limit}
                rowsPerPage={queryParams.limit}
                rowsPerPageOptions={defaultTablePerPagination}
            />
            <UserGroups
                openedUser={userGroups}
                closeUserGroups={closeUserGroups}
            />
            <UserPermissions
                openedUser={userPermissions}
                closeUserPermissions={closeUserPermissions}
            />
            <DeleteUserConfirmation
                isOpen={!!selectedRowToDelete}
                isLoading={deleteUserMutation.isLoading}
                onClose={closeDeleteRowConfirmation}
                onAccept={deleteRow}
            />
        </Card>
    )
};

UserListResults.propTypes = {
    dataFlow: PropTypes.object
};

export default UserListResults;