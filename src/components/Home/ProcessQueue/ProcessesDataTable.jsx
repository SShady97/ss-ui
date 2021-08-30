import React, { useContext, useState } from "react";
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import LayersClear from '@material-ui/icons/LayersClear';
import AddProcessButton from './AddProcessButton';
import LoadQueueModal from './LoadQueueModal';
import SaveQueueModal from './SaveQueueModal';
import Tooltip from "@material-ui/core/Tooltip";

import processQContext from '../../../context/processQ/processQContext';
import EditProcessButton from './EditProcessButton';


const ProcessesDataTable = () => {

    const processesQContext = useContext(processQContext);
    
    const  { queue, alias, setQueue, runQueue, setLoading, cleanAlias } = processesQContext;

    const columns = [
        {
            name: 'server_app',
            label:'Servidor',
        },
        {
            name: 'server_env',
            label:'Entorno',
        },
        {
            name: 'exec_name',
            label:'Usuario',
        },
        {
            name: 'script_alias',
            label:'Acción',
        },
        {
            name: 'parameter_param',
            label:'Parámetro',
            options: {
                customBodyRender: (value) => {

                    return (
                        <div>{value === null ? 'No Aplica' : value}</div>
                    )
                }
            }
        },
        {
            name: 'validation',
            label: 'Validación',
            options: {
                customBodyRender: (value) => {
                
                    return (
                        <div>{value === true ? 'Si' : 'No'}</div>
                    )
                }
            }
        },
        {
            name: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    
                    return (
                        <EditProcessButton rowIndex={tableMeta.rowIndex} />
                    )
                }
            }
        }
    ];

    const handleDelete = (rows) => {

        let new_queue = [...queue];

        for(let i = 0; i<rows.length; i++){
            new_queue.splice(rows[i].index, 1);

            if(i === rows.length-1){
                setQueue(true, new_queue);
            };
        };

    };

    const handleRun = () => {
        setLoading(true);
        runQueue();
    };
  
    const handleClean = () => {
      setQueue(true, []);
      cleanAlias();
    };

    

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'multiply',
        onRowsDelete:(rows)=> handleDelete(rows.data),
        filter: false,
        viewColumns: 'false',
        customToolbar: () => {
            return(
                <AddProcessButton />
            );
        }
    };


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MUIDataTable 
                    title={alias !== null ? alias : ""} 
                    data={queue} 
                    columns={columns} 
                    options={options}
                    style={{width: '100%'}}
                />
            </Grid>
            <Grid item xs={3}>
                <Tooltip title={"Limpiar Cola"}>
                    <span>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ width: "100%", fontWeight: "bold" }}
                            startIcon={<LayersClear />}
                            onClick={handleClean}
                            disabled={queue.length > 0 ? false : true}
                        >
                            Limpiar
                        </Button>
                    </span>
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <LoadQueueModal />
            </Grid>
            <Grid item xs={3}>
                <SaveQueueModal />
            </Grid>
            <Grid item xs={3}>
                <Tooltip title={"Ejecutar Cola"}>
                    <span>  
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: "100%", fontWeight: "bold", background: "green" }}
                            startIcon={<PlayArrow />}
                            onClick={handleRun}
                            disabled={queue.length > 0 ? false : true}
                        >
                            Ejecutar
                        </Button>
                    </span>
                </Tooltip> 
            </Grid>
        </Grid>
    );
};

export default ProcessesDataTable;
