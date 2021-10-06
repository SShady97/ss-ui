import React, { useContext, useEffect } from "react";

import MUIDataTable from "mui-datatables";

import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import AddButton from './AddButton/AddButton';
import QueueModal from './QueueModal';
import RowDialog from './RowDialog/RowDialog';

import execuserContext from '../../../context/execusers/execurserContext';
import serverContext from '../../../context/servers/serverContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';
import processQContext from '../../../context/processQ/processQContext';

const DBTable = ({ table }) => {

    const theme = useTheme();

    const [openAlert, setOpenAlert] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [queueModal, setQueueModal] = React.useState(false);
    const [rowValues, setRowValues] = React.useState([]);

    const toggleModal = () => setModal(!modal);
    const toggleQueueModal = () => setQueueModal(!queueModal);
    
    const execusersContext = useContext(execuserContext);
    const { exec_users, getAllExecUsers, addExec, editExec, deleteExec, alert_exec, alertmsg_exec, alertstatus_exec, setAlertExec } = execusersContext;
    const serversContext = useContext(serverContext);
    const { servers, getServers, addServer, editServer, deleteServer, alert_server, alertmsg_server, alertstatus_server, setAlertServer } = serversContext;
    const scriptsContext = useContext(scriptContext);
    const { scripts, getScripts, addScript, editScript, deleteScript, alert_script, alertmsg_script, alertstatus_script, setAlertScript } = scriptsContext;
    const parametersContext = useContext(parameterContext);
    const { parameters, getAllParameters, addParameter, editParameter, deleteParameter, alertmsg_parameter, alertstatus_parameter, alert_parameter, setAlertParameter } = parametersContext;
    const processQsContext = useContext(processQContext);
    const { savedQueues, getAllQueues, loadSavedQueue } = processQsContext;

    let columns = null;
    let data = null;
    let addFunction = null;
    let getFunction = null;
    let editFunction = null;
    let deleteFunction = null;
    let alertmsg = null;
    let alertstatus = null;
    let alert = null;
    let setAlert = null;

    const handleClose = (event, reason) => {
        setOpenAlert(false);
        setAlert(false);
      };

    useEffect(() => {
        getAllExecUsers();
        getServers();
        getScripts();
        getAllParameters();
        getAllQueues();
    }, []);

    switch (table) {
        default:
        case 'Usuarios de Ejeccución':
            columns = [
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'name',
                    label:'Usuario',
                },
                {
                    name: 'password',
                    label:'Contraseña',
                    options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return "********";
                        }
                    }
                }
            ];
            addFunction = addExec;
            getFunction = getAllExecUsers;
            editFunction = editExec;
            deleteFunction = deleteExec;
            data = exec_users;
            alert = alert_exec;
            alertmsg = alertmsg_exec;
            alertstatus = alertstatus_exec;
            setAlert = setAlertExec;
            break;

        case 'Servidores':
            columns = [
                {
                    name: 'app',
                    label:'Nombre',
                },
                {
                    name: 'environment',
                    label:'Ambiente',
                },
                {
                    name: 'name',
                    label:'Hostname',
                },
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'ip',
                    label:'Dirección IP',
                },
            ];
            addFunction = addServer;
            getFunction = getServers;
            editFunction = editServer;
            deleteFunction = deleteServer;
            data = servers;  
            alert = alert_server;  
            alertmsg = alertmsg_server;
            alertstatus = alertstatus_server;
            setAlert = setAlertServer;
            break;

        case 'Acciones':
            columns = [
                {
                    name: 'alias',
                    label:'Alias',
                },
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'parameter',
                    label:'Parametro',
                    options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            if(value) {
                                return 'Si';
                            } else {
                                return 'No'
                            }
                        }
                    }
                },
                {
                    name: 'command',
                    label:'Comando PowerShell',
                },
                {
                    name: 'types',
                    label:'Tipo',
                },
            ];
            addFunction = addScript;
            getFunction = getScripts;
            editFunction = editScript;
            deleteFunction = deleteScript;
            data = scripts; 
            alert = alert_script;  
            alertmsg = alertmsg_script;
            alertstatus = alertstatus_script;
            setAlert = setAlertScript;
            break;

        case 'Parametros':
            columns = [
                {
                    name: 'alias',
                    label:'Alias',
                },
                {
                    name: 'cat',
                    label:'Categoria',
                },
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'param',
                    label:'Parametro',
                },
            ];
            addFunction = addParameter;
            getFunction = getAllParameters;
            editFunction = editParameter;
            deleteFunction = deleteParameter;
            data = parameters;   
            alert = alert_parameter;
            alertmsg = alertmsg_parameter;
            alertstatus = alertstatus_parameter;
            setAlert = setAlertParameter;
            break;

        case 'Cola de Procesos':
            columns = [
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'alias',
                    label:'Alias',
                },
                {
                    name: 'log_email',
                    label:'Creador',
                },
            ];
            data = savedQueues;   
            break;
    }

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'none',
        viewColumns: 'false',
        onRowClick: rowData => {
            if ( table !== 'Cola de Procesos') {
                setRowValues(rowData);
                setModal(true);
            } else {
                const savedQueue = { 
                    id: rowData[0],
                    alias: rowData[1]
                 };
                loadSavedQueue(savedQueue, 1);
                setQueueModal(true);
            }
        },
        customToolbar: () => {
            if ( table !== 'Cola de Procesos') {
                return (
                    <AddButton table={table} columns={columns} addFunction={addFunction} getFunction={getFunction}/>
                );
            }
        }
    };



    return (
        <ThemeProvider theme={outerTheme => ({
            ...outerTheme,
            overrides: {
                MUIDataTableBodyRow: {
                    root: {
                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.action.selected,
                        },
                    }
                },
                MUIDataTableToolbar: {
                    titleText: {
                        fontWeight: "bold",
                        fontSize: "150%"
                    }
                },
                MUIDataTableHeadCell: {
                    data: {
                        fontWeight: "bold"
                    }
                }
            }
        })}>
            <Snackbar 
                open={alert} 
                autoHideDuration={4000} 
                onClose={handleClose} 
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'top'
                }}
            >
                <Alert variant="filled" onClose={handleClose} severity={alertstatus === 200 ? 'success' : 'error'}>
                    {alertstatus === 200 ? alertmsg : 'Error'}
                </Alert>
            </Snackbar>
            < MUIDataTable
                title={table}
                data={data}
                columns={columns}
                options={options}
            />
            <RowDialog 
                table={table} 
                rowValues={rowValues} 
                toogle={toggleModal} 
                open={modal} 
                columns={columns} 
                getFunction={getFunction}
                editFunction={editFunction}
                deleteFunction={deleteFunction}/>
            <QueueModal 
                toogle={toggleQueueModal} 
                open={queueModal} />
        </ThemeProvider>
    );
};

export default DBTable;
