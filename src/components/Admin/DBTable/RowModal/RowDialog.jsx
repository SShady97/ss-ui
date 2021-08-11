import React from "react";

import { TextField, Button, Box, useMediaQuery } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#517461'),
        backgroundColor: '#517461',
        '&:hover': {
            backgroundColor: '#517461',
        },
    },
}))(Button);

const FormTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#517461',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#517461',
            },
        },
    },
})(TextField);

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

const RowDialog = ({ columns, rowValues, toogle, open }) => {

    let columnsCopy = columns.slice();
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        toogle();
    };

    for (var i = 0; i < columns.length; i++) {
        if (columnsCopy[i] === 'ID') {
            columnsCopy.splice(i, 1);
            rowValues.splice(i, 1);
        }
    }

    const body = (
        <div>
            <DialogTitle id="responsive-dialog-title">{"Editar"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form className={classes.root} noValidate autoComplete="off">
                        {rowValues.map((rowValue, index) => (
                            <Box mb={2}>
                                <FormTextField id="standard-basic" label={columnsCopy[index]} style={{ width: "100%" }} variant="outlined" value={rowValue} />
                            </Box>

                        ))}
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="secondary">
                    Eliminar
                </Button>
                <Button onClick={handleClose} autoFocus color="disabled" varitant="contained">
                    Cancelar
                </Button>
                <ColorButton onClick={handleClose} autoFocus>
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