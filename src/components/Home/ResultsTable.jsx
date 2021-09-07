import React, { useContext } from "react";

import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import processQContext from '../../context/processQ/processQContext';

const ResultsTable = () => {

    const theme = useTheme();
    
    const processesQContext = useContext(processQContext);
    const  { res } = processesQContext;

    const columns = [
        {
            name: "Alias"
        },
        {
            name: "Entorno"
        },
        {
            name: "Hostname"
        }, 
        {
            name:   "IP"
        }, 
        {
            name: "Acción"
        }, 
        {
            name: "Resultado",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>{value.length > 200 ? value.substring(0, 301) : value}</div>
                    );
                }
            }
        },
        {
            name: "Validación",
            options: {
                customBodyRender: (value) => {
                    let validation;
                    let color;
                    if(value !== null){
                        if(value === true){
                            validation = 'Done';
                            color = 'green';
                        }else{
                            validation = 'Failed';
                            color = 'red';
                        }
                    }else{
                        validation = 'No Aplica';
                        color = 'black';
                    }
                    return (
                        <div style={{color: color}}>validation</div>
                    );
                }
            }
        }, 
        {
            name: "Usuario"
        }, 
        {
            name: "Descargar",
            options: {
                customBodyRender: (value) => {
                    
                    return (
                        <Tooltip title={"Descargar Resultado"}>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<GetAppIcon />}
                                style={{ width: "100%" }}
                                href={`${process.env.REACT_APP_API_URL}/api/get-txt/${value}`}
                            >
                                Resultado
                            </Button>
                        </Tooltip>
                    )
                }
            }
        }
    ];

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'none',
        viewColumns: 'false',
        filter: 'false'
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
            <MUIDataTable 
                title={""} 
                data={res} 
                columns={columns}
                options={options}  
            />
        </ThemeProvider>

    );
};

export default ResultsTable;
