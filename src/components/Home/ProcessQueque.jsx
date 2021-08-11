import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    boton: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

const ProcessQueque = () => {
    // const handleChange = (event, newValue) => {
    //     console.log(newValue);
    // };

    const classes = useStyles();

    return (
        <Button
            variant="outlined"
            className={classes.boton}
            startIcon={<VisibilityIcon />}
        >
            Ver procesos en cola
        </Button>
    );
};

export default ProcessQueque;
