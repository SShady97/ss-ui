import React from "react";

import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    boton: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    }
}));

const Export = () => {
    // const handleChange = (event, newValue) => {
    //     console.log(newValue);
    // };

    const classes = useStyles();

    return (
        <Button
            variant="outlined"
            className={classes.boton}
        >
            Export
        </Button>
    );
};

export default Export;
