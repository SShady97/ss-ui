import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import execuserReducer from './execuserReducer';
import execuserContext from './execurserContext';

import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS, ADD_EXECUSER } from '../../types';

import getStatus from '../../functions/getStatus';

const ExecuserState = props => {
    
    const initialState = {
        exec_users : [],
        selected_exec: null
    }

    const [ state, dispatch ] = useReducer(execuserReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

    const getExecUsers = async (server_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const api_url = `${url}:5000/api/win-remote-client/exec_users/server/${server_id}`;

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultExecUsers = await responseExecUsers.json();

            const { task_id, task_name } = resultExecUsers;

            let res;
        
            const i = setInterval(async () => {

                res = await getStatus(task_id, task_name);

                console.log(res.status)
                
                if(res.status === 'SUCCESS'){

                    console.log(res.result)

                    dispatch({
                        type: EXEC_USERS,
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

    const getAllExecUsers = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:8181/data/exec_user`;

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const exec_users = await responseExecUsers.json();

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

    const addExec = async ( formData ) => {

        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;

        const data = {
            name: formData.name,
            password: formData.password
        }

        const datastore_url = `${url}:8181/data/add/exec_user`;

        const responseAddExecUser = await fetch(datastore_url, 
                                                { method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddExecUser = responseAddExecUser.json();                                        

        dispatch({
            type: ADD_EXECUSER,
            payload: {msg: resultAddExecUser.msg }
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
                cleanExec: cleanExec,
                addExec: addExec
            }}
        >
            {props.children}
        </execuserContext.Provider>
    )

}

export default ExecuserState;