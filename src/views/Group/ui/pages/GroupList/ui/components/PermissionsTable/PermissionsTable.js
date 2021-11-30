import * as React from 'react';
import pt from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PermissionsTable = ({permissions}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permissions.map((permission) => {
                        return (
                            <TableRow
                                key={permission.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{permission.id}</TableCell>
                                <TableCell>{permission.name}</TableCell>
                                <TableCell>{permission.codename}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

PermissionsTable.defaultProps = {
    permissions: []
};

PermissionsTable.propTypes = {
    permissions: pt.array.isRequired
};

export default PermissionsTable;