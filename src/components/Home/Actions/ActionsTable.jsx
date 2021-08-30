import React, { useContext } from "react";
import MUIDataTable from "mui-datatables";
import scriptContext from '../../../context/scripts/scriptContext';


const ActionsTable = () => {

    
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
        <div>
            <MUIDataTable 
                title={""} 
                data={scripts} 
                columns={columns}
                options={options}  
            />
        </div>
    );
};

export default ActionsTable;
