import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import scriptReducer from './scriptReducer';
import scriptContext from './scriptContext';

import { SCRIPTS, SET_ALERT_SCRIPT, SET_SCRIPTS, CLEAN_SCRIPTS, ADD_SCRIPT, EDIT_SCRIPT, DELETE_SCRIPT } from '../../types';

import getStatus from '../../functions/getStatus';

const ScriptState = props => {
    
    const initialState = {
        scripts : [],
        selected_script: null,
        alert_script: false,
        alertmsg_script: null,
        alertstatus_script: null
    }

    const [ state, dispatch ] = useReducer(scriptReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

    const setAlertScript = (bool) => {
        dispatch({
            type: SET_ALERT_SCRIPT,
            payload: bool
        });
    } 

    const getScripts = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:5000/api/win-remote-client/scripts`;

            const responseScripts = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultScripts = await responseScripts.json();

            const { task_id, task_name } = resultScripts;

            let res;
        
            const i = setInterval(async () => {

                res = await getStatus(task_id, task_name);

                console.log(res.status)
                
                if(res.status === 'SUCCESS'){

                    console.log(res.result)

                    dispatch({
                        type: SCRIPTS,
                        payload: res.result
                    });

                    stopInterval();
                }
            
            },500);

            const stopInterval = () => {
                clearInterval(i);
            }

            
            
        } catch (error) {
            console.log(error);
        }

    }

    const selectScript = (scripts) => {
        
        dispatch({
            type: SET_SCRIPTS,
            payload: scripts
        })
    }

    const cleanScripts = () => {
        dispatch({
            type: CLEAN_SCRIPTS
        })
    }

    const addScript = async ( formData ) => {

        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;

        const data = {
            types: formData.types,
            command: formData.command,
            alias: formData.alias,
            parameter: formData.command.includes("$param")
        }

        const datastore_url = `${url}:8181/data/add/script`;

        const responseAddScript = await fetch(datastore_url, 
                                                { method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddScript = await responseAddScript.json();                                        

        dispatch({
            type: ADD_SCRIPT,
            payload: {msg: resultAddScript.msg, status: resultAddScript.status }
        })
    }

    const editScript = async ( script_id, formData ) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const data = {
                types: formData.types,
                command: formData.command,
                alias: formData.alias,
                parameter: formData.command.includes("$param")
            }
            
            const datastore_url = `${url}:8181/data/script/${script_id}`;

            const responseEditScript = await fetch(datastore_url, { method: 'PUT',
                                                                    headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                                    body: JSON.stringify(data)
                                                                    });
            const resultEditScript = await responseEditScript.json();

            dispatch({
                type: EDIT_SCRIPT,
                payload: {msg: resultEditScript.msg, status: resultEditScript.status }
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteScript = async (script_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const datastore_url = `${url}:8181/data/script/${script_id}`;

            const responseDeleteScript = await fetch(datastore_url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token} `}});
            const resultDeleteScript = await responseDeleteScript.json();

            dispatch({
                type: DELETE_SCRIPT,
                payload: {msg: resultDeleteScript.msg, status: resultDeleteScript.status }
            })
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <scriptContext.Provider
            value={{
                scripts: state.scripts,
                selected_script: state.selected_script,
                alert_script: state.alert_script,
                alertmsg_script: state.alertmsg_script,
                alertstatus_script: state.alertstatus_script,
                setAlertScript: setAlertScript,
                getScripts: getScripts,
                selectScript: selectScript,
                cleanScripts: cleanScripts,
                addScript: addScript,
                editScript: editScript,
                deleteScript: deleteScript
            }}
        >
            {props.children}
        </scriptContext.Provider>
    )

}

export default ScriptState;