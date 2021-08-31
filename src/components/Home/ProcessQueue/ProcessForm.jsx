import React, { useContext, useEffect, useState } from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, FormControl, FormControlLabel, Checkbox } from "@material-ui/core";


import serverContext from '../../../context/servers/serverContext';
import execuserContext from '../../../context/execusers/execurserContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';

const ProcessForm = ({ setValidation, open }) => {

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);
    const scriptsContext = useContext(scriptContext);
    const parametersContext = useContext(parameterContext);
    
    const  { servers, selectServer, selected_server } = serversContext;
    const  { cleanExec, getExecUsers, selectExec, exec_users, selected_exec } = execusersContext;
    const  { scripts, selectScript, selected_script } = scriptsContext;
    const  { parameters, selectParameter, selected_parameter, getParameters, cleanParameters } = parametersContext;

    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        
        if(open === true){
            if(selected_script){
                setChecked(selected_script.validation);
            }
        }
        
    }, [open]);

    const handleChangeServer = (server) => {

        selectParameter(null);
        selectExec(null);
        
        if(server !== null){
          selectServer(server);
          getExecUsers(server.id);
          getParameters(server.id);
        }else{
          selectServer(null);
          cleanExec();
          cleanParameters();
        }
        
    }

    const handleChangeExecuser = (exec_user) => {

        if(exec_user !== null){
            selectExec(exec_user);
        }else{
            selectExec(null);
        }

    };
  
    const handleChangeScript = (script) => {
        selectParameter(null);
        if(script !== null){
            selectScript(script);
        }else{
            selectScript(null);
        }

    };

    const handleChangeParameter = (parameter) => {

      if(parameter !== null){
          selectParameter(parameter);
      }else{
          selectParameter(null);
      }

    };

    const handleChangeValidation = (e) => {
        setValidation(e.target.checked);
        setChecked(e.target.checked)
    };

    return (
        <form>
            <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                <Autocomplete
                    bgcolor={"red"}
                    id="servers"
                    options={servers}
                    value={selected_server}
                    getOptionLabel={(server) => (`${server.app} / ${server.environment}`)}
                    getOptionSelected={(option, value) => option.id === value.id}
                    style={{ width: "100%" }}
                    onChange={(e, server) => handleChangeServer(server)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Servidor"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </FormControl>
            <FormControl required={true} style={{ width: "100%", marginBottom: '10px' }}>
                <Autocomplete
                    bgcolor={"red"}
                    id="execusers"
                    disabled={selected_server !== null ? false : true}
                    options={exec_users !== undefined ? exec_users : []}
                    getOptionLabel={(exec_user) => exec_user.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    value={selected_exec}
                    onChange={(e, exec_user) => handleChangeExecuser(exec_user)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </FormControl>
            <FormControl required={true} style={{ width: "100%", marginBottom: '10px' }}>
                <Autocomplete
                    bgcolor={"red"}
                    id="actions"
                    disabled={selected_server !== null ? false : true}
                    options={scripts !== undefined ? scripts : []}
                    getOptionLabel={(script) => script.alias}
                    getOptionSelected={(option, value) => option.id === value.id}
                    value={selected_script}
                    onChange={(e, script) => handleChangeScript(script)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Acción"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </FormControl>
            <FormControl required={true} style={{ width: "100%", marginBottom: '10px' }}>
                <Autocomplete
                    bgcolor={"red"}
                    id="parameters"
                    disabled={selected_script?.parameter !== false ? false : true}
                    options={parameters !== undefined ? parameters : []}
                    getOptionLabel={(parameter) => parameter.param}
                    getOptionSelected={(option, value) => option.id === value.id}
                    value={selected_parameter}
                    onChange={(e, parameter) => handleChangeParameter(parameter)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Parámetro"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </FormControl>
            <FormControl required={true} style={{ width: "100%", marginBottom: '10px' }}>
                <FormControlLabel
                    label="Validar ejecución del proceso"
                    control={<Checkbox onChange={handleChangeValidation} checked={checked} name="validation" />}
                />
            </FormControl>
            
            
        </form>
    );
}


export default ProcessForm;