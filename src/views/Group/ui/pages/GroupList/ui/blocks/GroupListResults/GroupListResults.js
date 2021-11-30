import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox, IconButton,
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
    Eye as EyeIcon
} from 'react-feather';

import {Maybe} from "src/common/functions/maybe";
import {privateRoutes} from "src/common/mainRoutes";
import {defaultTablePerPagination} from "src/common/constants";
import {Can} from "src/common/context/AccessControl/components";
import {permissions} from "src/common/context/AccessControl/authorization";

import {GroupContext} from "src/views/Group/common/context";
import {DeleteGroupConfirmation} from "src/views/Group/ui/pages/GroupList/ui/components";

import {GroupPermissions} from "../index";

const GroupListResults = ({dataFlow, queryParams, queryParamsManager, ...rest}) => {
    const {delete: {deleteGroupMutation}} = useContext(GroupContext);

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
    const [openedGroup, setOpenedGroup] = useState(null);

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

    const closeGroupPermissions = () => setOpenedGroup(null);

    const changePageHandler = (event, newPage) => queryParamsManager({offset: newPage * queryParams.limit});

    const changePerPageHandler = (e) => queryParamsManager({limit: e.target.value, offset: 0});

    const closeDeleteRowConfirmation = () => setSelectedRowToDelete(null);

    const deleteRow = () => !!selectedRowToDelete && deleteGroupMutation.mutate(selectedRowToDelete);

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
                                <TableCell style={{width: 100}}>
                                    Id
                                </TableCell>
                                <TableCell style={{width: 200}}>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Permissions
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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenedGroup(row)}>
                                            <EyeIcon strokeWidth={1.5} size={18}/>
                                        </IconButton>
                                    </TableCell>
                                    <Can permissions={[permissions.delete_group, permissions.change_group]}>
                                        <TableCell>
                                            <Can permissions={[permissions.change_group]}>
                                                <Link to={`${privateRoutes.AUTHORIZATION_GROUP_FORM}/${row.id}`}>
                                                    <IconButton aria-label='edit'>
                                                        <EditIcon strokeWidth={1.5} size={18}/>
                                                    </IconButton>
                                                </Link>
                                            </Can>
                                            <Can permissions={[permissions.delete_group]}>
                                                <IconButton
                                                    aria-label='delete'
                                                    onClick={() => setSelectedRowToDelete(row.id)}
                                                    disabled={deleteGroupMutation.isLoading}
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
            <GroupPermissions
                openedGroup={openedGroup}
                closeGroupPermissions={closeGroupPermissions}
            />
            <DeleteGroupConfirmation
                isOpen={!!selectedRowToDelete}
                isLoading={deleteGroupMutation.isLoading}
                onClose={closeDeleteRowConfirmation}
                onAccept={deleteRow}
            />
        </Card>
    );
};

GroupListResults.propTypes = {
    dataFlow: PropTypes.object
};

export default GroupListResults;