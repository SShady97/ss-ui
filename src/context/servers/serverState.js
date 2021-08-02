import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import serverReducer from './serverReducer';
import serverContext from './serverContext';

import { SERVERS, SET_SERVER } from '../../types';

import getStatus from '../../functions/getStatus';

const ServerState = props => {
    
    const initialState = {
        servers : [],
        selected_server: null
    }

    const [ state, dispatch ] = useReducer(serverReducer, initialState)


    const getServers = async () => {
        console.log(process.env.REACT_APP_API_URL)

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            console.log(token)

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/servers`;

            const responseServers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultServers = await responseServers.json();

            const { task_id, task_name } = resultServers;

            const servers = await getStatus(task_id, task_name);

            console.log(servers);

            dispatch({
                type: SERVERS,
                payload: servers
            })
            
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


    return (
        <serverContext.Provider
            value={{
                servers: state.servers,
                selected_server: state.selected_server,
                getServers: getServers,
                selectServer: selectServer
            }}
        >
            {props.children}
        </serverContext.Provider>
    )

}

export default ServerState;