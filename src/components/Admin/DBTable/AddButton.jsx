import React from "react";
import { IconButton, TextField, Button, Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

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
        width: 470,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    customizedButton: {
        position: 'absolute',
        left: '90%',
        top: '2%',
        color: 'red',
    }
}));

const AddButton = ({ value, columns }) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    for (var i = 0; i < columns.length; i++) {
        if (columns[i] === 'ID') {
            columns.splice(i, 1);
        }
    }

    const body = (
        <div>
            <DialogTitle id="responsive-dialog-title">Crear nueva entrada en {value}
                <IconButton aria-label="close" className={classes.customizedButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form className={classes.root} noValidate autoComplete="off">
                        {columns.map((option) => (
                            <FormTextField id={option} label={option} color="primary" style={{ width: "100%" }} variant="outlined" />
                        ))}
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Box textAlign='center' display="flex" flexDirection="row-reverse">
                    <ColorButton variant='contained' >
                        Guardar
                    </ColorButton>
                </Box>
            </DialogActions>
        </div >
    );

    return (
        <React.Fragment>
            <Tooltip title={"Nueva Entrada en " + value}>
                <IconButton onClick={handleOpen}>
                    <AddIcon className={AddIcon} />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="responsive-dialog-title"
                fullWidth
            >
                {body}
            </Dialog>
        </React.Fragment>
    );
}


export default AddButton;