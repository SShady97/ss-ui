import React, { useContext } from "react";

import tableIcons from '../../tableIcons';
import MaterialTable from 'material-table';

import scriptContext from '../../../context/scripts/scriptContext';


const ActionsTable = () => {

    
    const scriptsContext = useContext(scriptContext);

    const { scripts } = scriptsContext;

    const columns = [
        {
            title:'Alias',
            field: 'alias'
        },
        {
            title:'Comando PowerShell',
            field: 'script'
        }
    ];

    return (
        <div>
            <MaterialTable
                title=""
                icons={tableIcons}
                columns={columns}
                data={scripts}        
                options={{
                search: true
                }}
            />
        </div>
    );
};

export default ActionsTable;
