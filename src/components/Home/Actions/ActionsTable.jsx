import React, { useContext } from "react";
import MUIDataTable from "mui-datatables";
import scriptContext from '../../../context/scripts/scriptContext';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

const ActionsTable = () => {

    const theme = useTheme();
    
    const scriptsContext = useContext(scriptContext);

    const { scripts } = scriptsContext;

    const columns = [
        {   
            name: 'alias',
            label:'Alias'
            
        },
        {   
            name: 'command',
            label:'Comando PowerShell'
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
                data={scripts} 
                columns={columns}
                options={options}  
            />
        </ThemeProvider>
    );
};

export default ActionsTable;
