import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import serverReducer from './serverReducer';
import serverContext from './serverContext';

import { SERVERS } from '../../types';

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
            console.log(token)

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/exec_users`;

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultExecUsers = await responseExecUsers.json();

            const { task_id, task_name } = resultExecUsers;

            const exec_users = await getStatus(task_id, task_name);

            dispatch({
                type: SERVERS,
                payload: servers
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const selectServer = (server_id) => {
        dispatch({
            type: SET_SERVER,
            payload: server_id
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