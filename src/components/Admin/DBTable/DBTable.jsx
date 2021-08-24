import React, { useContext, useEffect } from "react";

import MUIDataTable from "mui-datatables";

import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import AddButton from './AddButton';
import QueueModal from './QueueModal';
import RowDialog from './RowModal/RowDialog';

import execuserContext from '../../../context/execusers/execurserContext';
import serverContext from '../../../context/servers/serverContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';
import processQContext from '../../../context/processQ/processQContext';

const DBTable = ({ table }) => {

    const theme = useTheme();

    const [modal, setModal] = React.useState(false);
    const [queueModal, setQueueModal] = React.useState(false);

    const [rowValues, setRowValues] = React.useState([]);

    const toggleModal = () => setModal(!modal);
    const toggleQueueModal = () => setQueueModal(!queueModal);
    
    const execusersContext = useContext(execuserContext);
    const { exec_users, getAllExecUsers, addExec } = execusersContext;
    const serversContext = useContext(serverContext);
    const { servers, getServers } = serversContext;
    const scriptsContext = useContext(scriptContext);
    const { scripts, getScripts } = scriptsContext;
    const parametersContext = useContext(parameterContext);
    const { parameters, getAllParameters } = parametersContext;
    const processQsContext = useContext(processQContext);
    const { savedQueues, getAllQueues, loadSavedQueue, queueA } = processQsContext;

    let columns = null;
    let data = null;
    let addFunction = null;
    let getFunction = null;

    useEffect(() => {
        getAllExecUsers();
        getServers();
        getScripts();
        getAllParameters();
        getAllQueues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    label:'Name',
                },
                {
                    name: 'password',
                    label:'Password',
                    
                }
            ];
            addFunction = addExec;
            getFunction = getAllExecUsers;
            data = exec_users;
            break;

        case 'Servidores':
            columns = [
                {
                    name: 'app',
                    label:'App',
                },
                {
                    name: 'env',
                    label:'Env',
                },
                {
                    name: 'hostname',
                    label:'Hostname',
                },
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'ip',
                    label:'Direción IP',
                },
            ];
            data = servers;  
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
                    name: 'script',
                    label:'Comando PowerShell',
                },
                {
                    name: 'types',
                    label:'Typo',
                },
            ];
            data = scripts;   
            break;

        case 'Parametros':
            columns = [
                {
                    name: 'alias',
                    label:'Alias',
                },
                {
                    name: 'cat',
                    label:'CAT',
                },
                {
                    name: 'id',
                    label:'ID',
                },
                {
                    name: 'param',
                    label:'Param',
                },
            ];
            data = parameters;   
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
            < MUIDataTable
                title={table}
                data={data}
                columns={columns}
                options={options}
            />
            <RowDialog rowValues={rowValues} toogle={toggleModal} open={modal} columns={columns} />
            <QueueModal rowValues={rowValues} toogle={toggleQueueModal} open={queueModal} />
        </ThemeProvider>
    );
};

export default DBTable;
