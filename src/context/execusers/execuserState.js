import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import execuserReducer from './execuserReducer';
import execuserContext from './execurserContext';

import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS, ADD_EXECUSER, EDIT_EXECUSER, DELETE_EXECUSER, SET_ALERT_EXECUSER } from '../../types';

import getStatus from '../../functions/getStatus';

const ExecuserState = props => {
    
    const initialState = {
        exec_users : [],
        selected_exec: null,
        alert_exec: false,
        alertmsg_exec: null,
        alertstatus_exec: null
    }

    const [ state, dispatch ] = useReducer(execuserReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

    const setAlertExec = (bool) => {
        dispatch({
            type: SET_ALERT_EXECUSER,
            payload: bool
        });
    } 

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
        
        const resultAddExecUser = await responseAddExecUser.json();                                        

        dispatch({
            type: ADD_EXECUSER,
            payload: {msg: resultAddExecUser.msg, status: resultAddExecUser.status }
        })
    }

    const editExec = async ( exec_user_id, formData ) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const data = {
                name: formData.name,
                password: formData.new_password ? formData.new_password : formData.password
            }
            
            const datastore_url = `${url}:8181/data/exec_user/${exec_user_id}`;

            const responseEditExecUser = await fetch(datastore_url, { method: 'PUT',
                                                                    headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                                    body: JSON.stringify(data)
                                                                    });
            const resultEditExecUser = await responseEditExecUser.json();

            dispatch({
                type: EDIT_EXECUSER,
                payload: {msg: resultEditExecUser.msg, status: resultEditExecUser.status }
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteExec = async (exec_user_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:8181/data/exec_user/${exec_user_id}`;

            const responseDeleteExecUser = await fetch(api_url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token} `}});
            const resultDeleteExecUser = await responseDeleteExecUser.json();

            dispatch({
                type: DELETE_EXECUSER,
                payload: {msg: resultDeleteExecUser.msg, status: resultDeleteExecUser.status }
            })
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <execuserContext.Provider
            value={{
                exec_users: state.exec_users,
                selected_exec: state.selected_exec,
                alert_exec: state.alert_exec,
                alertmsg_exec: state.alertmsg_exec,
                alertstatus_exec: state.alertstatus_exec,
                setAlertExec: setAlertExec,
                getExecUsers: getExecUsers,
                getAllExecUsers: getAllExecUsers,
                selectExec: selectExec,
                cleanExec: cleanExec,
                addExec: addExec,
                editExec: editExec,
                deleteExec: deleteExec
            }}
        >
            {props.children}
        </execuserContext.Provider>
    )

}

export default ExecuserState;