import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import processQReducer from './processQReducer';
import processQContext from './processQContext';

import { 
    SET_QUEUE, QUEUES, LOADING, SET_SQUEUES, LOAD_SQUEUE, CLEAN_ALIAS, SAVE_QUEUE,
    SET_ALERT, LOAD_SQUEUE_ADMIN, AFTER_DELETE, SET_PTOEDIT
} from '../../types';

import getStatus from '../../functions/getStatus';

const ProcessQState = props => {
    
    const initialState = {
        queue : [],
        queueA: [],
        alias: null,
        savedQueues: [],
        selected_SQueue: null,
        res: [],
        loading: false,
        alert: false,
        alertmsg: null,
        alertstatus: null,
        process_ToEdit: null
    }

    const [ state, dispatch ] = useReducer(processQReducer, initialState);


    const runQueue = async () => {

        let data = [];
        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;
        
        state.queue.forEach(process => {

            const payload = {
                server: process.server_id,
                user: process.exec_id,
                script: process.script_id,
                parameter: process.parameter_id !== null ? process.parameter_id : 1,
                validation: process.validation
            }

            data.push(payload)
            
        });

        const api_url = `${process.env.REACT_APP_API_URL}/api/win-client`;

        const responseServers = await fetch(api_url, 
                                            { method: 'POST', 
                                            headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                            body: JSON.stringify(data)
                                            });
                                            
        const resultServers = await responseServers.json();

        const { task_id, task_name } = resultServers;
                                
        let res;
        
        const i = setInterval(async () => {

            res = await getStatus(task_id, task_name);

            console.log(res.status)
            
            if(res.status === 'SUCCESS'){

                console.log(res.result.responses)

                dispatch({
                    type: 'RESPONSE',
                    payload: {
                        response: res.result.responses,
                        msg: res.result.msg,
                        status: res.result.status
                    }
                });
                stopInterval();
            }
        
        },1000);

        const stopInterval = () => {
            clearInterval(i);
        }
                                 
    }

    const setQueue = (del, queue) => {

        if(!del){
            dispatch({
                type: SET_QUEUE,
                payload: queue
            });
        }else{
            dispatch({
                type: AFTER_DELETE,
                payload: queue
            });
        }
        

    }

    const setLoading = (bool) => {
        dispatch({
            type: LOADING,
            payload: bool
        });    
    }

    const getSavedQueues = async () => {

        let token = await authProvider.getIdToken();
        const login_email = authProvider.account.userName;
        token = token.idToken.rawIdToken;

        try{
            const datastore_url = `${process.env.REACT_APP_DATASTORE_URL}/data/queues/${login_email}`;
            const responseQueues = await fetch(datastore_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultQueues = await responseQueues.json();

            dispatch({
                type: SET_SQUEUES,
                payload: resultQueues
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const saveQueue = async (alias) => {

        let processes = [];
        let token = await authProvider.getIdToken();
        const log_email = authProvider.account.userName;
        token = token.idToken.rawIdToken;
        
        state.queue.forEach(process => {

            const payload = {
                id_user: process.exec_id,
                id_server: process.server_id,
                id_script: process.script_id,
                id_parameter: process.parameter_id !== null ? process.parameter_id : 1,
                validation: process.validation
            };

            processes.push(payload);
            
        });

        const data = {
            queue: { alias: alias, log_email: log_email },
            queue_processes: processes
        }

        const datastore_url = `${process.env.REACT_APP_DATASTORE_URL}/data/add/queue`;

        const responseSaveQueue = await fetch(datastore_url, 
                                            { method: 'POST', 
                                            headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                            body: JSON.stringify(data)
                                            });
                                            
        const resultSaveQueue = await responseSaveQueue.json();

        dispatch({
            type: SAVE_QUEUE,
            payload: {
                msg: resultSaveQueue.msg, 
                status: resultSaveQueue.status, 
                alias: resultSaveQueue.status === 200 ? alias : null
            }
        });
 
    }

    const setAlert = (bool) => {
        dispatch({
            type: SET_ALERT,
            payload: bool
        });
    } 

    const loadSavedQueue = async (queue, flag=0) => {

        const alias = queue.alias;
        const queue_id = queue.id
        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;

        try{
            const datastore_url = `${process.env.REACT_APP_DATASTORE_URL}/data/queue/${queue_id}`;
            const responseQueue = await fetch(datastore_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultQueue = await responseQueue.json();
  
            let data = [];

            for (let i=0; i<resultQueue.length; i++){

                if (flag === 0 ) {

                    const process = {
                        server_id: resultQueue[i]['id_server'],
                        server_app: resultQueue[i]['app'],
                        server_env: resultQueue[i]['environment'],
                        exec_id: resultQueue[i]['id_user'], 
                        exec_name: resultQueue[i]['execuser_name'],
                        script_id: resultQueue[i]['id_script'], 
                        script_alias: resultQueue[i]['script_alias'],
                        parameter_id: resultQueue[i]['id_parameter'], 
                        parameter_param: resultQueue[i]['param'],
                        validation: resultQueue[i]['validation']
                    }
                    
                    data.push(process)

                    if(i === resultQueue.length - 1){
                        dispatch({
                            type: LOAD_SQUEUE,
                            payload: [data, alias]
                        })
                    }
                } else if ( flag === 1) {

                    const process = {
                        alias: alias,
                        server_app: resultQueue[i]['app'],
                        server_env: resultQueue[i]['environment'],
                        exec_user: resultQueue[i]['execuser_name'],
                        script: resultQueue[i]['script_alias'],
                        parameter: resultQueue[i]['param'],
                        validation: resultQueue[i]['validation'] === true ? 'Si' : 'No'
                    }
                    
                    data.push(process)
                    if(i === resultQueue.length - 1){
                        dispatch({
                            type: LOAD_SQUEUE_ADMIN,
                            payload: data
                        })
                    }
                    console.log(resultQueue);
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cleanAlias = () => {
        dispatch({
            type: CLEAN_ALIAS
        })
    }

    const getAllQueues = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_DATASTORE_URL}/data/queues`;

            const responseQueues = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const savedQueues = await responseQueues.json();

            dispatch({
                type: QUEUES,
                payload: savedQueues
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const setProcToEdit = (index) => {

        const process = state.queue[index];

        dispatch({
            type: SET_PTOEDIT,
            payload: process
        });

    }

    return (
        <processQContext.Provider
            value={{
                queue: state.queue,
                queueA: state.queueA,
                alias: state.alias,
                savedQueues: state.savedQueues,
                selected_SQueue: state.selected_SQueue,
                res: state.res,
                loading: state.loading,
                alert: state.alert,
                alertmsg: state.alertmsg,
                alertstatus: state.alertstatus,
                process_ToEdit: state.processToEdit,
                runQueue: runQueue,
                setQueue: setQueue,
                setLoading: setLoading,
                getSavedQueues: getSavedQueues,
                loadSavedQueue: loadSavedQueue,
                saveQueue: saveQueue,
                cleanAlias: cleanAlias,
                setAlert: setAlert,
                getAllQueues: getAllQueues,
                setProcToEdit: setProcToEdit
            }}
        >
            {props.children}
        </processQContext.Provider>
    )

}

export default ProcessQState;