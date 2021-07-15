import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = [{ name: "Proceso" }, { name: "Alternativa" }];

const SavedProcesses = () => {
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
            style={{ width: "100%", backgroundColor: "White"}}
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
