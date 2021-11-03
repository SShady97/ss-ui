import React from "react";
import { IconButton, TextField, Button, Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import EmailIcon from "@material-ui/icons/Email";
import CloseIcon from '@material-ui/icons/Close';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";


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

const EmailButton = ({ sendEmail }) => {

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

    const handleSend = e => {
        e.preventDefault();

        let email = e.target.email.value;

        sendEmail(email);

        // let target = e.target;
        // let formData = {};

        // for (let i=0; i<target.length; i++) {
        //     if(target.elements[i].value) {
        //         formData[target.elements[i].getAttribute('id')] = target.elements[i].value;
        //     }
        // }

        // addFunction(formData);
        // getFunction();
        handleClose();
    };

    const body = (
        <div>
            <DialogTitle id="responsive-dialog-title">Enviar resultados por correo electrónico
                <IconButton aria-label="close" className={classes.customizedButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form id="emailForm" onSubmit={handleSend} className={classes.root} noValidate autoComplete="off">
                        <TextField id="email" label="Correo Electrónico" style={{ width: "100%" }} variant="outlined" />
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Box textAlign='center' display="flex" flexDirection="row-reverse">
                    <ColorButton variant='contained' type='submit' form='emailForm'>
                        Enviar
                    </ColorButton>
                </Box>
            </DialogActions>
        </div >
    );

    return (
        <React.Fragment>
            <Tooltip title={"Enviar resultados por correo"}>
                <IconButton onClick={handleOpen}>
                    <EmailIcon />
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


export default EmailButton;