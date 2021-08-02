import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import execuserContext from '../../context/execusers/execurserContext';
import serverContext from '../../context/servers/serverContext';

const ExecutionUsers = () => {

    const execusersContext = useContext(execuserContext);
    const serversContext = useContext(serverContext);

    const  { exec_users, selectExec, selected_exec } = execusersContext;
    const  { selected_server } = execusersContext;

    const [ selected, setSelected ] = useState(null);


    const handleChange = (event, exec_user) => {
        if(exec_user !== null){
            selectExec(exec_user);
        }else{
            selectExec(null);
        }
    };


    return (
        <Autocomplete
            bgcolor={"red"}
            id="users"
            options={exec_users !== undefined ? exec_users : []}
            getOptionLabel={(exec_user) => exec_user.name}
            value={selected_exec}
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
