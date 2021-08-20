import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import scriptReducer from './scriptReducer';
import scriptContext from './scriptContext';

import { SCRIPTS, SET_SCRIPTS, CLEAN_SCRIPTS } from '../../types';

import getStatus from '../../functions/getStatus';

const ScriptState = props => {
    
    const initialState = {
        scripts : [],
        selected_script: null
    }

    const [ state, dispatch ] = useReducer(scriptReducer, initialState)


    const getScripts = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_DATASTORE_URL}/data/script`;

            const responseScripts = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const scripts = await responseScripts.json();

            dispatch({
                type: SCRIPTS,
                payload: scripts
            })
            
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


    return (
        <scriptContext.Provider
            value={{
                scripts: state.scripts,
                selected_script: state.selected_script,
                getScripts: getScripts,
                selectScript: selectScript,
                cleanScripts: cleanScripts
            }}
        >
            {props.children}
        </scriptContext.Provider>
    )

}

export default ScriptState;