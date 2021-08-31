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
    const  { selectExec, getExecUsers } = execusersContext;
    const  { selectScript } = scriptsContext;
    const  { selectParameter, getParameters } = parametersContext;
    const  { queue, setProcToEdit } = processesQContext;

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <Fragment>
            <Tooltip title={"Editar Proceso"}>
                <Button color="primary" variant="outlined" onClick={handleOpen}>
                    <EditIcon className={EditIcon} />
                </Button>
            </Tooltip>
            <GeneralModal open={open} setOpen={setOpen} addModal={false} rowIndex={rowIndex} />
        </Fragment>
    );
}


export default EditProcessButton;