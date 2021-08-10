import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";

const ProcessQueque = () => {
    /* const handleChange = (event, newValue) => {
        console.log(newValue);
    }; */

    return (
        <Button
            variant="contained"
            style={{ width: "100%", backgroundColor:'White'}}
            startIcon={<VisibilityIcon />}
        >
            Ver procesos en cola
        </Button>
    );
};

export default ProcessQueque;
