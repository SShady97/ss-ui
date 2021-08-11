import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = [{ name: "Proceso" }, { name: "Alternativa" }];

const useStyles = makeStyles((theme) => ({
    buscador: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    }
}));

const SavedProcesses = () => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        console.log(newValue);
    };

    return (
        <Autocomplete
            bgcolor={"red"}
            id="savedprocesses"
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            className={classes.buscador}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Procesos"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

export default SavedProcesses;
