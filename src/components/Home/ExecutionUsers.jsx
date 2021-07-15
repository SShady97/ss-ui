import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = [{ name: "Alejandro" }, { name: "Laura" }];

const ExecutionUsers = () => {
    const handleChange = (event, newValue) => {
        console.log(newValue);
    };

    return (
        <Autocomplete
            bgcolor={"red"}
            id="users"
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            style={{ width: "100%" }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccionar Usuario"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

export default ExecutionUsers;
