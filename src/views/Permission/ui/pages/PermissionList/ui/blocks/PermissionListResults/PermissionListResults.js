import {useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';

import {Maybe} from "src/common/functions/maybe";
import {defaultTablePerPagination} from "src/common/constants";

const PermissionListResults = ({dataFlow, queryParams, queryParamsManager, ...rest}) => {

    const [selectedRowIds, setSelectedRowIds] = useState([]);

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

    const changePageHandler = (event, newPage) => queryParamsManager({offset: newPage * queryParams.limit});

    const changePerPageHandler = (e) => queryParamsManager({limit: e.target.value, offset: 0});

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
                                    Id
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Code name
                                </TableCell>
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
                                    <TableCell>{row.codename}</TableCell>
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
        </Card>
    );
};

PermissionListResults.propTypes = {
    dataFlow: PropTypes.object
};

export default PermissionListResults;