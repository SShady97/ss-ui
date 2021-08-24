import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import serverReducer from './serverReducer';
import serverContext from './serverContext';

import { SERVERS, SET_SERVER, CLEAN_SERVERS } from '../../types';

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


    return (
        <serverContext.Provider
            value={{
                servers: state.servers,
                selected_server: state.selected_server,
                getServers: getServers,
                selectServer: selectServer,
                cleanServers: cleanServers
            }}
        >
            {props.children}
        </serverContext.Provider>
    )

}

export default ServerState;