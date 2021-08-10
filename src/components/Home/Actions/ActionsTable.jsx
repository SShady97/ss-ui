import React, { useState, useContext } from "react";

import tableIcons from '../../tableIcons';
import MaterialTable from 'material-table';

import scriptContext from '../../../context/scripts/scriptContext';


const ActionsTable = ({ setActions }) => {

    
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
        <MaterialTable
            title="Acciones disponibles"
            icons={tableIcons}
            columns={columns}
            data={scripts}        
            options={{
            search: true
            }}
        />

    );
};

export default ActionsTable;
