<<<<<<< HEAD:src/components/Home/ProcessQueue/SavedQueues.jsx
import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
=======
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
>>>>>>> 9f5a66706659f33f512f11a5e5514d68e4727cfd:src/components/Home/SavedProcesses.jsx
import Autocomplete from "@material-ui/lab/Autocomplete";

import processQContext from '../../../context/processQ/processQContext';

const SavedQueues = ({ setSelected }) => {

    const processesQContext = useContext(processQContext);

    const  { savedQueues } = processesQContext;

<<<<<<< HEAD:src/components/Home/ProcessQueue/SavedQueues.jsx
=======
const useStyles = makeStyles((theme) => ({
    buscador: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    }
}));

const SavedProcesses = () => {
    const classes = useStyles();

>>>>>>> 9f5a66706659f33f512f11a5e5514d68e4727cfd:src/components/Home/SavedProcesses.jsx
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
            className={classes.buscador}
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

export default SavedQueues;
