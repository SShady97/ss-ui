import React from "react";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'Black',
        color: 'White',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(app, env, server, ip, action, result, text, email, date, user) {
    return { app, env, server, ip, action, result, text, email, date, user };
}

const rows = [
    createData(1, 159, 6.0, 24, 4.0, 33, 21, 22, 69, 22),
    createData(1, 159, 6.0, 24, 4.0, 33, 21, 22, 69, 22),
    createData(1, 159, 6.0, 24, 4.0, 33, 21, 22, 69, 22),
    createData(1, 159, 6.0, 24, 4.0, 33, 21, 22, 69, 22),
];

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

const ResultsTable = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>App</StyledTableCell>
                        <StyledTableCell align="right">Env</StyledTableCell>
                        <StyledTableCell align="right">Server</StyledTableCell>
                        <StyledTableCell align="right">IP</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                        <StyledTableCell align="right">Result</StyledTableCell>
                        <StyledTableCell align="right">Get Text</StyledTableCell>
                        <StyledTableCell align="right">Send Email</StyledTableCell>
                        <StyledTableCell align="right">Datetime</StyledTableCell>
                        <StyledTableCell align="right">Execution User</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.app}>
                            <TableCell component="th" scope="row">
                                {row.app}
                            </TableCell>
                            <TableCell align="right">{row.env}</TableCell>
                            <TableCell align="right">{row.server}</TableCell>
                            <TableCell align="right">{row.ip}</TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">{row.result}</TableCell>
                            <TableCell align="right">{row.text}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.user}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResultsTable;
