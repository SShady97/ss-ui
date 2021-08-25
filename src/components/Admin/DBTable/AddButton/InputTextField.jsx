import React from "react";
import { TextField } from "@material-ui/core";

const InputTextField = ({ table, option }) => {
    if (table === 'Acciones') {
        if(option.name === 'parameter') {
            return null;
        } else if(option.name === 'command'){
            return <TextField helperText="Utilizar $param donde vaya el parametro si es necesario" id={option.name} label={option.label} style={{ width: "100%" }} variant="outlined" />;
        } else {
            return <TextField id={option.name} label={option.label} style={{ width: "100%" }} variant="outlined" />;
        }
    } else {
        return <TextField id={option.name} label={option.label} style={{ width: "100%" }} variant="outlined" />;
    }

};

export default InputTextField;
