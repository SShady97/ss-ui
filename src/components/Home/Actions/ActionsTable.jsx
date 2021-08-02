import React, { useState } from "react";

import MUIDataTable from "mui-datatables";

import { createTheme, ThemeProvider } from '@material-ui/core/styles';


const ActionsTable = () => {

    const data = [
        ["Reiniciar Servidor", "qwadsefgrgh"],
        ["Reiniciar IIS", "ewrerteyhr"]
    ];

    let columns = ['Alias', 'Comando Powershell'];

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'none',
        viewColumns: 'false',
        filter: 'false'
    
    };



    return (
        <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
        />

    );
};

export default ActionsTable;
