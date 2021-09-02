import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import scriptReducer from './scriptReducer';
import scriptContext from './scriptContext';

import { SCRIPTS, SET_SCRIPTS, CLEAN_SCRIPTS, ADD_SCRIPT, DELETE_SCRIPT } from '../../types';

import getStatus from '../../functions/getStatus';

const ScriptState = props => {
    
    const initialState = {
        scripts : [],
        selected_script: null
    }

    const [ state, dispatch ] = useReducer(scriptReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

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
        
        const resultAddScript = responseAddScript.json();                                        

        dispatch({
            type: ADD_SCRIPT,
            payload: {msg: resultAddScript.msg }
        })
    }

    const deleteScript = async (script_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_DATASTORE_URL}/data/script/${script_id}`;

            const responseDeleteScript = await fetch(api_url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token} `}});
            const resultDeleteScript = await responseDeleteScript.json();

            dispatch({
                type: DELETE_SCRIPT,
                payload: {msg: resultDeleteScript.msg }
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
                getScripts: getScripts,
                selectScript: selectScript,
                cleanScripts: cleanScripts,
                addScript: addScript,
                deleteScript: deleteScript
            }}
        >
            {props.children}
        </scriptContext.Provider>
    )

}

export default ScriptState;