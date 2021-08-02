import React from "react";

import { makeStyles, Modal, Paper, TextField } from "@material-ui/core";

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

const RowModal = ({ columns, rowValues, toogle, open }) => {

    const classes = useStyles();

    const handleClose = () => {
        toogle();
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="modal-title">Titulo</h2>
            <hr></hr>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off">
                    {rowValues.map((rowValue, index) => (
                        <TextField id="standard-basic" label={rowValue} />
                    ))}
                </form>
            </Paper>
        </div>
    );

    return (
        < div key={open} style={{ width: "100%" }}>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </div >
    );
};

export default RowModal;