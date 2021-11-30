import * as React from 'react';
import pt from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const GroupsTable = ({groups}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}} size="small" aria-label="groups dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((group) => {
                        return (
                            <TableRow
                                key={group.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{group.id}</TableCell>
                                <TableCell>{group.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

GroupsTable.defaultProps = {
    groups: []
};

GroupsTable.propTypes = {
    groups: pt.array.isRequired
};

export default GroupsTable;