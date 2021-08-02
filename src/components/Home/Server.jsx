import React, { useContext, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import serverContext from '../../context/servers/serverContext';
import execuserContext from '../../context/execusers/execurserContext';

const Server = () => {

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);

    const  { servers, selectServer, selected_server } = serversContext;
    const  { clean, getExecUsers } = execusersContext;

    const handleChange = (event, server) => {
        if(server !== null){
            selectServer(server);
            getExecUsers(server.id);
        }else{
            selectServer(null);
            clean();
        }
    };

    useEffect(() => {
        console.log(selected_server)
    }, [selected_server])

    return (
        <Autocomplete
            bgcolor={"red"}
            id="servers"
            options={servers}
            getOptionLabel={(server) => {return(`${server.app} / ${server.env}`)}}
            onChange={handleChange}
            style={{ width: "100%" }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccionar Servidor"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

export default Server;
