import React from "react";

import Button from "@material-ui/core/Button";

const Export = () => {
    const handleChange = (event, newValue) => {
        console.log(newValue);
    };

    return (
        <Button
            variant="outlined"
            style={{ width: "100%", backgroundColor:'#517461', color:'White'}}
        >
            Export
        </Button>
    );
};

export default Export;
