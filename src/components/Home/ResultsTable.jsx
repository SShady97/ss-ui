import React, { useContext } from "react";

import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
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
                            validation = 'DONE!';
                            color = '#46BD3E';
                        }else{
                            validation = 'FAILED!';
                            color = '#FB0707';
                        }
                    }else{
                        validation = 'N/A';
                        color = '#4186E3';
                    }
                    return (
                        <Chip
                            label={validation}
                            clickable
                            style={{backgroundColor: color, fontWeight: 'bold', color: 'white'}}
                            deleteIcon={<DoneIcon />}
                        />
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
                            <IconButton
                                color='primary'
                                href={`${process.env.REACT_APP_API_URL}/api/get-txt/${value}`}
                            >
                                <GetAppIcon /> 
                            </IconButton>
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
