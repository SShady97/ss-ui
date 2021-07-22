import React from "react";

import { makeStyles, withStyles, useTheme, IconButton, Paper } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from "@material-ui/core";

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import SearchBar from "material-ui-search-bar";
import PropTypes from 'prop-types';

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

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
};


function createData(alias, id, type, datetime, status) {
    return { alias, id, type, datetime, status };
}

const originalRows = [
    createData('aaa', 159, 6.0, 24, 4.0),
    createData('bbb', 21, 22, 69, 22),
    createData('ccc', 4.0, 33, 21, 22),
    createData('ddd', 15933, 21, 69, 22),
    createData('eee', 15933, 21, 69, 22),
    createData('dfs', 15933, 21, 69, 22),
];

const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 300
    }

}));

const TasksTable = () => {
    const classes = useStyles();

    const [rows, setRows] = React.useState(originalRows);
    const [searched, setSearched] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.alias.includes(searchedVal);
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div className={classes.paper}>
            <h2 id="titulo"> Tareas Programadas </h2>
            <hr></hr>
            <Paper>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    style={{ backgroundColor: "lightgrey" }}
                />
                <TableContainer>
                    <Table className={classes.table} aria-label="Actions">

                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Alias</StyledTableCell>
                                <StyledTableCell align="right">ID</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                                <StyledTableCell align="right">Execution Datetime</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <StyledTableRow key={row.alias}>
                                    <TableCell component="th" scope="row">
                                        {row.alias}
                                    </TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.datetime}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                        <TableFooter>
                            <TableRow align="right">
                                <TablePagination
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    labelRowsPerPage=''
                                    rowsPerPageOptions={[]}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default TasksTable;
