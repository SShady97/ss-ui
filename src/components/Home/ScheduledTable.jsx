import React, { useContext } from "react";

import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import processQContext from '../../context/processQ/processQContext';

const ScheduledTable = () => {

    const theme = useTheme();

    const processesQContext = useContext(processQContext);
    const  { scheduledExec } = processesQContext;
    

    const columns = [
        {
            name: "alias",
            label: "Alias"
        },
        {
            name: "task_id",
            label: "ID"
        },
        {
            name: "datetime",
            label:   "Fecha de Ejecución",
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
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
                        data={scheduledExec} 
                        columns={columns}
                        options={options}
                        style={{width: '100%'}} 
                    />
                </ThemeProvider>
            </Grid>
        </Grid>
    );
};

export default ScheduledTable;
