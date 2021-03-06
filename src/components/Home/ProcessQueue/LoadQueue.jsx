import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import processQContext from '../../../context/processQ/processQContext';

const LoadQueue = ({ setSelected }) => {

    const processesQContext = useContext(processQContext);

    const  { savedQueues } = processesQContext;

    const handleChange = (event, newValue) => {
        setSelected(newValue);
    };

    return (
        <Autocomplete
            bgcolor={"red"}
            id="savedprocesses"
            options={savedQueues}
            getOptionLabel={(option) => option.alias}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione una cola"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

export default LoadQueue;
