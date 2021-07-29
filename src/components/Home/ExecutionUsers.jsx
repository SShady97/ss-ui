import React, { useContext, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import execuserContext from '../../context/execusers/execurserContext';

const ExecutionUsers = () => {

    const execusersContext = useContext(execuserContext);

    const  { exec_users, selectExec, selected_exec } = execusersContext;


    const handleChange = (event, exec_user) => {
        if(exec_user !== null){
            selectExec(exec_user.id);
        }else{
            selectExec(null);
        }
    };

    useEffect(() => {
        console.log(selected_exec)
    }, [selected_exec])

    return (
        <Autocomplete
            bgcolor={"red"}
            id="users"
            options={exec_users !== undefined ? exec_users : []}
            getOptionLabel={(exec_user) => exec_user.name}
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
