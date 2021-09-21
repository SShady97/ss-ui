import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import serverReducer from './serverReducer';
import serverContext from './serverContext';

import { SERVERS, SET_SERVER, CLEAN_SERVERS, ADD_SERVER, EDIT_SERVER, DELETE_SERVER, SET_ALERT_SERVER } from '../../types';

import getStatus from '../../functions/getStatus';

const ServerState = props => {
    
    const initialState = {
        servers : [],
        selected_server: null,
        alert_server: false,
        alertmsg_server: null,
        alertstatus_server: null
    }

    const [ state, dispatch ] = useReducer(serverReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

    const setAlertServer = (bool) => {
        dispatch({
            type: SET_ALERT_SERVER,
            payload: bool
        });
    } 

    const getServers = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const api_url = `${url}:5000/api/win-remote-client/servers`;

            const responseServers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultServers = await responseServers.json();

            const { task_id, task_name } = resultServers;

    
            let res;
        
            const i = setInterval(async () => {

                res = await getStatus(task_id, task_name);

                console.log(res.status)
                
                if(res.status === 'SUCCESS'){

                    console.log(res.result)

                    dispatch({
                        type: SERVERS,
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

    const selectServer = (server) => {
        dispatch({
            type: SET_SERVER,
            payload: server
        })
    }

    const cleanServers = () => {
        dispatch({
            type: CLEAN_SERVERS
        })
    }

    const addServer = async ( formData ) => {

        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;

        const data = {
            name: formData.name,
            app: formData.app,
            environment: formData.environment,
            ip: formData.ip
        }

        const datastore_url = `${url}:8181/data/add/server`;

        const responseAddServer = await fetch(datastore_url, 
                                                { method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddServer = await responseAddServer.json();                                        

        dispatch({
            type: ADD_SERVER,
            payload: {msg: resultAddServer.msg, status: resultAddServer.status }
        })
    }

    const editServer = async ( server_id, formData ) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const data = {
                name: formData.name,
                app: formData.app,
                environment: formData.environment,
                ip: formData.ip
            }
            
            const datastore_url = `${url}:8181/data/server/${server_id}`;

            const responseEditServer = await fetch(datastore_url, { method: 'PUT',
                                                                    headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                                    body: JSON.stringify(data)
                                                                    });
            const resultEditServer = await responseEditServer.json();

            dispatch({
                type: EDIT_SERVER,
                payload: {msg: resultEditServer.msg, status: resultEditServer.status  }
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteServer = async (server_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:8181/data/server/${server_id}`;

            const responseDeleteServer = await fetch(api_url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token} `}});
            const resultDeleteServer = await responseDeleteServer.json();

            dispatch({
                type: DELETE_SERVER,
                payload: {msg: resultDeleteServer.msg, status: resultDeleteServer.status }
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <serverContext.Provider
            value={{
                servers: state.servers,
                selected_server: state.selected_server,
                alert_server: state.alert_server,
                alertmsg_server: state.alertmsg_server,
                alertstatus_server: state.alertstatus_server,
                setAlertServer: setAlertServer,
                getServers: getServers,
                selectServer: selectServer,
                cleanServers: cleanServers,
                addServer: addServer,
                editServer: editServer,
                deleteServer: deleteServer
            }}
        >
            {props.children}
        </serverContext.Provider>
    )

}

export default ServerState;