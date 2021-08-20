import React, { useContext, useEffect } from "react";

import MUIDataTable from "mui-datatables";

import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import AddButton from './AddButton';
import RowDialog from './RowModal/RowDialog';

import execuserContext from '../../../context/execusers/execurserContext';
import serverContext from '../../../context/servers/serverContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';
import processQContext from '../../../context/processQ/processQContext';

const DBTable = ({ value }) => {

    const theme = useTheme();

    const [modal, setModal] = React.useState(false);

    const [rowValues, setRowValues] = React.useState([]);

    
    const execusersContext = useContext(execuserContext);
    const { exec_users, getAllExecUsers } = execusersContext;
    const serversContext = useContext(serverContext);
    const { servers, getServers } = serversContext;
    const scriptsContext = useContext(scriptContext);
    const { scripts, getScripts } = scriptsContext;
    const parametersContext = useContext(parameterContext);
    const { parameters, getAllParameters } = parametersContext;
    const processQsContext = useContext(processQContext);
    const { queque } = processQsContext;
    

    const toggle = () => setModal(!modal);

    let columns = null;
    let data = null;

    useEffect(() => {
        getAllExecUsers();
        getServers();
        getScripts();
        getAllParameters();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    switch (value) {
        default:
        case 'Execution Users':
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
            data = exec_users;
            break;
        case 'Servers':
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
        case 'Scripts':
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
                                return 'Verdadero';
                            } else {
                                return 'Falso'
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
        case 'Parameters':
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
        case 'Processes':
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
            console.log(queque);
            data = queque;   
            break;
    }

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'none',
        viewColumns: 'false',
        onRowClick: rowData => {
            console.log(rowData)
            setRowValues(rowData);
            setModal(true);
        },
        customToolbar: () => {

                return (
                    <AddButton value={value} columns={columns} />
                );
            
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
                title={value}
                data={data}
                columns={columns}
                options={options}
            />
            <RowDialog rowValues={rowValues} toogle={toggle} open={modal} columns={columns} />
            {/* <RowModal rowValues={rowValues} toogle={toggle} open={modal} columns={columns} /> */}
        </ThemeProvider>

    );
};

export default DBTable;
