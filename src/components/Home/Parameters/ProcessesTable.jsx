import React, { useState, useContext, useEffect } from 'react';

import tableIcons from '../../tableIcons';
import MaterialTable from 'material-table';
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import serverContext from '../../../context/servers/serverContext';
import execuserContext from '../../../context/execusers/execurserContext';
import scriptContext from '../../../context/scripts/scriptContext';
import parameterContext from '../../../context/parameters/parameterContext';



const ProcessesTable = () => {

    const serversContext = useContext(serverContext);
    const execusersContext = useContext(execuserContext);
    const scriptsContext = useContext(scriptContext);
    const parametersContext = useContext(parameterContext);
    
    const  { servers, selectServer, selected_server } = serversContext;
    const  { cleanExec, getExecUsers, selectExec, exec_users, selected_exec } = execusersContext;
    const  { scripts, selectScript, selected_script } = scriptsContext;
    const  { parameters, selectParameter, selected_parameter, getParameters, cleanParameters } = parametersContext;

    const [ data, setData ] = useState([]);
    const [ validation, setValidation ] = useState(false);

    const handleChangeServer = (e, server, props) => {
      props.onChange(server);
      if(server !== null){
        selectServer(server);
        getExecUsers(server.id);
        getParameters(server.id);
        selectExec(null);
        selectParameter(null);
      }else{
        selectServer(null);
        cleanExec();
        cleanParameters();
      }
    }

    const handleChangeExecuser = (e, exec_user, props) => {
      props.onChange(exec_user);
      if(exec_user !== null){
          selectExec(exec_user);
      }else{
          selectExec(null);
      }
    };

    const handleChangeScript = (e, script, props) => {
      props.onChange(script);
      if(script !== null){
          selectScript(script);
      }else{
          selectScript(null);
      }
    };

    const handleChangeParameter = (e, parameter, props) => {
      props.onChange(parameter);
      if(parameter !== null){
          selectParameter(parameter);
      }else{
          selectParameter(null);
      }
    };

    const handleChangeValidation = (e, props) => {
      props.onChange(e.target.checked);
      setValidation(e.target.checked);
    };

    

    const tableColumns = [
      
        {
          title: "Servidor",
          field: "server",
          validate: rowData => selected_server !== null,
          editComponent: (props) => {
            return (
              <div>
                <Autocomplete
                    bgcolor={"red"}
                    id="servers"
                    options={servers}
                    value={selected_server}
                    getOptionLabel={(server) => (`${server.app} / ${server.env}`)}
                    style={{ width: "100%" }}
                    onChange={(e, server) => handleChangeServer(e, server, props)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Seleccionar Servidor"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
              </div>
            );
          },
          render: (rowdata) => {

            return(
              <div>
                {rowdata.server.app}
              </div>
             
            )
          }
        },
        {
          title: "Usuario de Ejecución",
          field: "exec_user",
          validate: rowData => selected_exec !== null,
          editComponent: (props) => {
            return (
              <div>
                <Autocomplete
                  bgcolor={"red"}
                  id="execusers"
                  disabled={selected_server !== null ? false : true}
                  options={exec_users !== undefined ? exec_users : []}
                  getOptionLabel={(exec_user) => exec_user.name}
                  value={selected_exec}
                  onChange={(e, exec_user) => handleChangeExecuser(e, exec_user, props)}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Seleccionar Usuario"
                          variant="outlined"
                          fullWidth
                      />
                  )}
                />
              </div>
            );
          },
          render: (rowdata) => {
            return(
              <div>
                {rowdata.exec_user.name}
              </div>
             
            )
          }
        },
        {
          title: "Accion",
          field: "action",
          validate: rowData => selected_script !== null,
          editComponent: (props) => {
            return (
              <div>
                <Autocomplete
                  bgcolor={"red"}
                  id="actions"
                  disabled={selected_server !== null ? false : true}
                  options={scripts !== undefined ? scripts : []}
                  getOptionLabel={(script) => script.alias}
                  value={selected_script}
                  onChange={(e, script) => handleChangeScript(e, script, props)}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Seleccionar Accion"
                          variant="outlined"
                          fullWidth
                      />
                  )}
                />
              </div>
            );
          },
          render: (rowdata) => {
            return(
              <div>
                {rowdata.script.alias}
              </div>
             
            )
          }
        },
        {
          title: "Parámetro",
          field: "parameter",
          validate: rowData => rowData?.action?.parameter === true ? (selected_parameter !== null ? true : false) : true,
          editComponent: (props) => {
            return (
              <div>
                <Autocomplete
                  bgcolor={"red"}
                  id="parameters"
                  disabled={selected_script?.parameter !== false ? false : true}
                  options={parameters !== undefined ? parameters : []}
                  getOptionLabel={(parameter) => parameter.param}
                  value={selected_parameter}
                  onChange={(e, parameter) => handleChangeParameter(e, parameter, props)}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Seleccionar Parámetro"
                          variant="outlined"
                          fullWidth
                      />
                  )}
                />
              </div>
            );
          },
          render: (rowdata) => {
            return(
              <div>
                {rowdata.parameter !== null ? rowdata.parameter.param : 'No aplica'}
              </div>
             
            )
          }
        },
        {
          title: "Validar",
          field: "validation",
          editComponent: (props) => {
            return (
              <input
                type="checkbox"
                checked={validation}
                onChange={(e, validation) => handleChangeValidation(e, props)}
              />
            );
          },
          render: (rowdata) => (
            <input type="checkbox" checked={rowdata.validation} disabled />
          )
        }
    ];

    useEffect(() => {
      console.log(data)
    }, [data]);

    return (
        <MaterialTable
        columns={tableColumns}
        icons={tableIcons}
        style={{ width: "100%" }}
        data={data}
        title=""
        options={{ search: false, actionsColumnIndex: -1 }}
        editable={{
          onRowAdd: (process) =>
          
            new Promise((resolve, reject) => {

              setTimeout(() => {
                const row = {
                  server: selected_server, 
                  exec_user: selected_exec, 
                  script: selected_script, 
                  parameter: selected_parameter !== null ? selected_parameter : null,
                  validation: validation
                };
                
                setData([...data, row]);
                setValidation(false);
                selectServer(null);
                selectScript(null);
                cleanExec();
                cleanParameters();
                resolve();
              }, 1000);  
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
        actions={[
          {
            icon: tableIcons.RunQueue,
            tooltip: 'Run process queue',
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row")
          }
        ]}
      />
    );
}

export default ProcessesTable;