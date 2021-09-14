import React from "react";
import { TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

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

const EditTextField = ({ name, label, value, table }) => {
    if (table === 'Acciones') {
        if(name === 'parameter') {
            return null;
        } else if(name === 'command'){
            return <FormTextField 
                    helperText="Utilizar $param donde vaya el parametro si es necesario"
                    id={name} 
                    label={label} 
                    style={{ width: "100%" }} 
                    variant="outlined" 
                    defaultValue={value} />;
        } else {
            return <FormTextField 
                    id={name} 
                    label={label} 
                    style={{ width: "100%" }} 
                    variant="outlined" 
                    defaultValue={value} />;
        }
    } else if ( table === 'Usuarios de Ejeccución' && name === 'password') {
        return <div>
                    <FormTextField 
                        id="new_password"
                        label="Nueva contraseña"
                        style={{ width: "100%" }} 
                        variant="outlined"  />
                    <FormTextField 
                        id={name} 
                        defaultValue={value} 
                        type="hidden" />
                </div>;
    } else {
        return <FormTextField 
                id={name} 
                label={label} 
                style={{ width: "100%" }} 
                variant="outlined" 
                defaultValue={value} />;
    }
};

export default EditTextField;
