import React from "react";

import { TextField, Button, Box, useMediaQuery } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";

import DeleteButton from './DeleteButton';
import EditTextField from './EditTextField';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#517461'),
        backgroundColor: '#517461',
        '&:hover': {
            backgroundColor: '#517461',
        },
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        width: 670,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3),
    },
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    table: {
        minWidth: 650
    }

}));

const RowDialog = ({ table, columns, rowValues, toogle, open, getFunction, editFunction, deleteFunction }) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    let id = null;

    const handleClose = () => {
        toogle();
    };

    const columnsCopy = [...columns];
    const rowValuesCopy = [...rowValues];
    const idIndex = columns.findIndex(x => x.name ==='id');
    columnsCopy.splice(idIndex, 1);
    rowValuesCopy.splice(idIndex, 1);
    id = rowValues[idIndex];

    const handleEdit = e => {
        e.preventDefault();

        let target = e.target;
        let formData = {};

        for (let i=0; i<target.length; i++) {
            if(target.elements[i].value) {
                formData[target.elements[i].getAttribute('id')] = target.elements[i].value;
            }
        }

        editFunction(id, formData);
        getFunction();
        handleClose();
    };
    
    const body = (
        <div>
            <DialogTitle id="responsive-dialog-title">{"Editar"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form id="editForm" onSubmit={handleEdit} className={classes.root} noValidate autoComplete="off">
                        {columnsCopy.map((columnCopy, index) => (
                            <Box mb={2}>
                                <EditTextField name={columnCopy.name} label={columnCopy.label} value={rowValuesCopy[index]} table={table} />
                            </Box>
                        ))} 
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <DeleteButton id ={id} handleClose={handleClose} getFunction={getFunction} deleteFunction={deleteFunction} />
                <Button onClick={handleClose} autoFocus color="disabled" varitant="contained">
                    Cancelar
                </Button>
                <ColorButton type='submit' form='editForm' autoFocus>
                    Guardar
                </ColorButton>
            </DialogActions>
        </div>

    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            {body}
        </Dialog>
    );
};

export default RowDialog;