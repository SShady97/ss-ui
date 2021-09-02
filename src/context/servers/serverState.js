import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import serverReducer from './serverReducer';
import serverContext from './serverContext';

import { SERVERS, SET_SERVER, CLEAN_SERVERS, ADD_SERVER, DELETE_SERVER } from '../../types';

import getStatus from '../../functions/getStatus';

const ServerState = props => {
    
    const initialState = {
        servers : [],
        selected_server: null
    }

    const [ state, dispatch ] = useReducer(serverReducer, initialState)


    const getServers = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/servers`;

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

        const datastore_url = `${process.env.REACT_APP_DATASTORE_URL}/data/add/server`;

        const responseAddServer = await fetch(datastore_url, 
                                                { method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddServer = responseAddServer.json();                                        

        dispatch({
            type: ADD_SERVER,
            payload: {msg: resultAddServer.msg }
        })
    }

    const deleteServer = async (server_id) => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_DATASTORE_URL}/data/server/${server_id}`;

            const responseDeleteServer = await fetch(api_url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token} `}});
            const resultDeleteServer = await responseDeleteServer.json();

            dispatch({
                type: DELETE_SERVER,
                payload: {msg: resultDeleteServer.msg }
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
                getServers: getServers,
                selectServer: selectServer,
                cleanServers: cleanServers,
                addServer: addServer,
                deleteServer: deleteServer
            }}
        >
            {props.children}
        </serverContext.Provider>
    )

}

export default ServerState;