import React, { useContext, Fragment } from "react";

import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import processQContext from '../../context/processQ/processQContext';


const tableTheme = createTheme({
    overrides: {
        MUIDataTable: {
            root: {
                backgroundColor: "#FF000"
            },
            paper: {
                boxShadow: "none"
            }
        },
        MUIDataTableBodyRow: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f2f2f2',
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
});

const ResultsTable = () => {
    
    const processesQContext = useContext(processQContext);
    const  { res, loading } = processesQContext;

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
            name: "Resultado"
        }, 
        {
            name: "Usuario"
        }, 
        {
            name: "Descargar",
            options: {
                customBodyRender: (value) => {
                    
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<GetAppIcon />}
                            style={{ width: "100%" }}
                            href={`${process.env.REACT_APP_API_URL}/api/get-txt/${value}`}
                        >
                            Resultado
                        </Button>
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
        <Fragment>
            {loading

                ?
                    <div style={{ alignItems: "center", display: "flex", justifyContent: "center", margin: "50px"}}>
                        <CircularProgress />
                    </div>
                :
                    <ThemeProvider theme={tableTheme}>
                        <MUIDataTable 
                            title={""} 
                            data={res} 
                            columns={columns}
                            options={options}  
                        />
                    </ThemeProvider>
            }
        </Fragment>
    );
};

export default ResultsTable;
