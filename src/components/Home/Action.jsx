import React from "react";

import { makeStyles, withStyles, useTheme, IconButton, Button, Modal, Paper } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from "@material-ui/core";

import CodeIcon from "@material-ui/icons/Code";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CloseIcon from '@material-ui/icons/Close';

import SearchBar from "material-ui-search-bar";
import PropTypes from 'prop-types';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'Black',
        color: 'White',
    },
}))(TableCell);

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

function createData(alias, script) {
    return { alias, script };
}

const originalRows = [
    createData('alias', 'script asolkjdoiewjdoiewj9 2098eoi23jds 9234u89-23e-32ue98032ue -2893eu982jd2389du2 289 3ue8923ued9832ue8239 8923ue8932eu2 9823ue'),
    createData('name', 'script'),
    createData('something', 'script'),
    createData('1', 'script asolkjdoiewjdoiewj9 2098eoi23jds 9234u89-23e-32ue98032ue -2893eu982jd2389du2 289 3ue8923ued9832ue8239 8923ue8932eu2 9823ue'),
    createData('2', 'script'),
    createData('3', 'script'),
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
        minWidth: 650
    }

}));

const Action = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="modal-title">Escoja una acción
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
            </h2>
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
                                <StyledTableCell align="left">Script</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.alias}>
                                    <TableCell component="th" scope="row">
                                        {row.alias}
                                    </TableCell>
                                    <TableCell align="left">{row.script}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
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

    return (
        <div style={{ width: "100%" }}>
            <Button
                variant="outlined"
                style={{ width: "100%", backgroundColor: "White" }}
                startIcon={<CodeIcon />}
                onClick={handleOpen}
            >
                Acción a Ejecutar
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    );
};

export default Action;
