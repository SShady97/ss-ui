import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import execuserReducer from './execuserReducer';
import execuserContext from './execurserContext';

import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS } from '../../types';

import getStatus from '../../functions/getStatus';

const ExecuserState = props => {
    
    const initialState = {
        exec_users : [],
        selected_exec: null
    }

    const [ state, dispatch ] = useReducer(execuserReducer, initialState)


    const getExecUsers = async (server_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/exec_users/server/${server_id}`;

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultExecUsers = await responseExecUsers.json();

            const { task_id, task_name } = resultExecUsers;

            const exec_users = await getStatus(task_id, task_name);

            dispatch({
                type: EXEC_USERS,
                payload: exec_users
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const getAllExecUsers = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_DATASTORE_URL}/data/exec_user`;

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const exec_users = await responseExecUsers.json();

            console.log(exec_users);

            dispatch({
                type: EXEC_USERS,
                payload: exec_users
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const selectExec = (exec_user) => {
        dispatch({
            type: SET_EXEC,
            payload: exec_user
        })
    }

    const cleanExec = () => {
        dispatch({
            type: CLEAN_EXECUSERS
        })
    }


    return (
        <execuserContext.Provider
            value={{
                exec_users: state.exec_users,
                selected_exec: state.selected_exec,
                getExecUsers: getExecUsers,
                getAllExecUsers: getAllExecUsers,
                selectExec: selectExec,
                cleanExec: cleanExec
            }}
        >
            {props.children}
        </execuserContext.Provider>
    )

}

export default ExecuserState;