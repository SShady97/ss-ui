import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import processQReducer from './processQReducer';
import processQContext from './processQContext';

import { 
    SET_QUEUE, QUEUES, LOADING, SET_SQUEUES, LOAD_SQUEUE, CLEAN_ALIAS, SAVE_QUEUE,
    SET_ALERT, LOAD_SQUEUE_ADMIN, AFTER_DELETE, SET_PTOEDIT, EDIT_PROCESS
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
        loading: null,
        alert: false,
        alertmsg: null,
        alertstatus: null,
        process_ToEdit: null
    }

    const [ state, dispatch ] = useReducer(processQReducer, initialState);

    const url = `${window.location.protocol}//${window.location.hostname}`;

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

        const api_url = `${url}:5000/api/win-client`;

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

    const setLoading = (location) => {
        dispatch({
            type: LOADING,
            payload: location
        });    
    }

    const getSavedQueues = async () => {

        let token = await authProvider.getIdToken();
        const login_email = authProvider.account.userName;
        token = token.idToken.rawIdToken;

        try{
            const datastore_url = `${url}:8181/data/queues/${login_email}`;
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

        const datastore_url = `${url}:8181/data/add/queue`;

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
            const datastore_url = `${url}:8181/data/queue/${queue_id}`;
            const responseQueue = await fetch(datastore_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultQueue = await responseQueue.json();
        
            const queue = resultQueue.queue;

            let data = [];

            for (let i=0; i<queue.length; i++){

                if (flag === 0 ) {

                    const process = {
                        server_id: queue[i]['id_server'],
                        server_app: queue[i]['app'],
                        server_env: queue[i]['environment'],
                        exec_id: queue[i]['id_user'], 
                        exec_name: queue[i]['execuser_name'],
                        script_id: queue[i]['id_script'], 
                        script_alias: queue[i]['script_alias'],
                        script_parameter: queue[i]['parameter'],
                        parameter_id: (queue[i]['id_parameter'] === 1 ? null : queue[i]['id_parameter']), 
                        parameter_param: (queue[i]['param'] === 'No Aplica' ? null : queue[i]['param']),
                        validation: queue[i]['validation']
                    }
                    
                    data.push(process)

                    if(i === queue.length - 1){
                        dispatch({
                            type: LOAD_SQUEUE,
                            payload: {
                                data: data, 
                                alias: alias,
                                msg: resultQueue.msg,
                                status: resultQueue.status
                            }
                        })
                    }
                } else if ( flag === 1) {

                    const process = {
                        alias: alias,
                        server_app: queue[i]['app'],
                        server_env: queue[i]['environment'],
                        exec_user: queue[i]['execuser_name'],
                        script: queue[i]['script_alias'],
                        parameter: queue[i]['param'],
                        validation: queue[i]['validation'] === true ? 'Si' : 'No'
                    }
                    
                    data.push(process)
                    if(i === queue.length - 1){
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
            
            const api_url = `${url}:8181/data/queues`;

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

    const editProcess = (new_process, rowIndex) => {

        state.queue.splice(rowIndex, 1, new_process);
        dispatch({
            type: EDIT_PROCESS,
            payload: {
                queue: state.queue,
                msg: 'Proceso editado con éxito!',
                status: 200
            }
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
                setProcToEdit: setProcToEdit,
                editProcess: editProcess
            }}
        >
            {props.children}
        </processQContext.Provider>
    )

}

export default ProcessQState;