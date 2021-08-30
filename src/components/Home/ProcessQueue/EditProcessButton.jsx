import React, { useState, useContext, Fragment, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import GeneralModal from './GeneralModal';

import serverContext from '../../../context/servers/serverContext';
import execuserContext from '../../../context/execusers/execurserContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';
import processQContext from '../../../context/processQ/processQContext';

const EditProcessButton = ({ rowIndex }) => {

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);
    const scriptsContext = useContext(scriptContext);
    const parametersContext = useContext(parameterContext);
    const processesQContext = useContext(processQContext);
    
    const  { selectServer } = serversContext;
    const  { selectExec } = execusersContext;
    const  { selectScript } = scriptsContext;
    const  { selectParameter } = parametersContext;
    const  { queue, setProcToEdit } = processesQContext;

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
        
        const proc_toEdit = queue[rowIndex];
    
        const server = {
            id: proc_toEdit.server_id,
            app: proc_toEdit.server_app,
            env: proc_toEdit.server_env
        };

        const exec_user = {
            id: proc_toEdit.exec_id,
            name: proc_toEdit.exec_name
        };

        const script = {
            id: proc_toEdit.script_id,
            alias: proc_toEdit.script_alias,
            parameter: (proc_toEdit.script_parameter === 'No Aplica' ? null : proc_toEdit.script_parameter),
            validation: proc_toEdit.validation === 'Si' ? true : false
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
    };


    return (
        <Fragment>
            <Tooltip title={"Editar Proceso"}>
                <Button color="primary" variant="outlined" onClick={handleOpen}>
                    <EditIcon className={EditIcon} />
                </Button>
            </Tooltip>
            <GeneralModal open={open} setOpen={setOpen} addModal={false}/>
        </Fragment>
    );
}


export default EditProcessButton;