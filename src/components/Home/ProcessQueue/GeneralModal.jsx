import React, { useState, useContext, useEffect } from "react";
import { Button, useMediaQuery } from "@material-ui/core";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import ProcessForm from './ProcessForm';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

import serverContext from '../../../context/servers/serverContext';
import execuserContext from '../../../context/execusers/execurserContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';
import processQContext from '../../../context/processQ/processQContext';


const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        width: 470,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    customizedButton: {
        position: 'absolute',
        left: '90%',
        top: '2%',
        color: 'red',
    }
}));

const GeneralModal = ({ open, setOpen, addModal, rowIndex }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [ validation, setValidation ] = useState(false);
    const [ disabled, setDisabled ] = useState(true);

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);
    const scriptsContext = useContext(scriptContext);
    const parametersContext = useContext(parameterContext);
    const processesQContext = useContext(processQContext);
    
    const  { selected_server, selectServer } = serversContext;
    const  { selected_exec, selectExec, getExecUsers } = execusersContext;
    const  { selected_script, selectScript } = scriptsContext;
    const  { selected_parameter, selectParameter, getParameters } = parametersContext;
    const  { queue, setQueue, editProcess } = processesQContext;

    useEffect(() => {

        setDisabled(true);

        if(open === true && addModal === true){
            setValidation(false);
        }

        if(open === true && addModal === false){
            const proc_toEdit = queue[rowIndex];
    
            const server = {
                id: proc_toEdit.server_id,
                app: proc_toEdit.server_app,
                environment: proc_toEdit.server_env
            };

            const exec_user = {
                id: proc_toEdit.exec_id,
                name: proc_toEdit.exec_name
            };

            const script = {
                id: proc_toEdit.script_id,
                alias: proc_toEdit.script_alias,
                parameter: (proc_toEdit.script_parameter === 'No Aplica' ? null : proc_toEdit.script_parameter),
                validation: proc_toEdit.validation
            };

            let parameter = null;

            if(proc_toEdit.parameter_id !== null){
                parameter = {
                    id: proc_toEdit.parameter_id,
                    param: proc_toEdit.parameter_param
                };
            }

            selectServer(server);
            selectExec(exec_user);
            selectScript(script);
            selectParameter(parameter);
        }

    }, [open]);

    useEffect(() => {
        if(selected_server !== null && addModal === false){
            getExecUsers(selected_server.id);
            getParameters(selected_server.id);
        }
    }, [selected_server])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddProcess = () => {

        const process_queue = {
            server_id: selected_server.id,
            server_app: selected_server.app, 
            server_env: selected_server.environment,
            exec_id: selected_exec.id,
            exec_name: selected_exec.name,
            script_id: selected_script.id,
            script_alias: selected_script.alias,
            script_parameter: selected_script.parameter,
            parameter_id: (selected_parameter !== null ? selected_parameter.id : null),
            parameter_param: (selected_parameter !== null ? selected_parameter.param : null),
            validation: validation
        }

        setOpen(false);
        setQueue(false, process_queue);

    }

    const handleEditProcess = () => {
       
        const process_queue = {
            server_id: selected_server.id,
            server_app: selected_server.app, 
            server_env: selected_server.environment,
            exec_id: selected_exec.id,
            exec_name: selected_exec.name,
            script_id: selected_script.id,
            script_alias: selected_script.alias,
            script_parameter: selected_script.parameter,
            parameter_id: (selected_parameter !== null ? selected_parameter.id : null),
            parameter_param: (selected_parameter !== null ? selected_parameter.param : null),
            validation: validation
        }

        setOpen(false);
        editProcess(process_queue, rowIndex);

    }

    useEffect(() => {
        
        if(selected_server === null || selected_exec === null || selected_script === null){
            setDisabled(true);
        }else{
            if(selected_script.parameter === true){
                if(selected_parameter !== null){
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }else{
                setDisabled(false);
            }
        }

        
        

    }, [selected_server, selected_exec, selected_script, selected_parameter]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogTitle id="responsive-dialog-title">
                {addModal ? 'A??adir Proceso a la Cola' : 'Editar Proceso'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <ProcessForm setValidation={setValidation} open={open}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                
                <Button onClick={handleClose} style={{ fontWeight: 'bold' }} color="secondary" variant='contained' autoFocus>
                    Cancelar
                </Button>
                <Button 
                    disabled={disabled}
                    variant='contained' 
                    color='primary' 
                    style={{ fontWeight: 'bold' }} 
                    onClick={addModal ? handleAddProcess : handleEditProcess}>
                    <div>
                        {addModal ? 'A??adir' : 'Editar'}
                    </div>
                </Button>
                
            </DialogActions>
        </Dialog>
    );
}


export default GeneralModal;