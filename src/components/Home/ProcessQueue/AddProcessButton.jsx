import React, { useState, useContext, Fragment } from "react";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import GeneralModal from './GeneralModal';

import serverContext from '../../../context/servers/serverContext';
import execuserContext from '../../../context/execusers/execurserContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';


const AddProcessButton = () => {

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);
    const scriptsContext = useContext(scriptContext);
    const parametersContext = useContext(parameterContext);
    
    const  { selectServer } = serversContext;
    const  { selectExec } = execusersContext;
    const  { selectScript } = scriptsContext;
    const  { selectParameter } = parametersContext;

    const [open, setOpen] = useState(false);
    

    const handleOpen = () => {
        setOpen(true);
        selectServer(null);
        selectExec(null);
        selectScript(null);
        selectParameter(null);
    };

    return (
        <Fragment>
            <Tooltip title={"Agregar Proceso"}>
                <IconButton onClick={handleOpen}>
                    <AddIcon className={AddIcon} />
                </IconButton>
            </Tooltip>
            <GeneralModal open={open} setOpen={setOpen} addModal={true} rowIndex={-1}/>
        </Fragment>
    );
}


export default AddProcessButton;