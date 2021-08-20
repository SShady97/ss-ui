import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import processQReducer from './processQReducer';
import processQContext from './processQContext';

import { SET_QUEUE, RUN_QUEUE, QUEQUES } from '../../types';

import getStatus from '../../functions/getStatus';

const ProcessQState = props => {
    
    const initialState = {
        queue : [],
        data: []
    }

    const [ state, dispatch ] = useReducer(processQReducer, initialState)


    const runQueue = async () => {

        let data = [];

        state.queue.map(process => {

            const payload = {
                server: process.server.id,
                user: process.exec_user.id,
                script: process.script.id,
                parameter: process.parameter !== null ? process.parameter.id : null,
                validation: process.validation
            }

            data.push(payload)
        });

        console.log(data);

    }

    const setQueue = (queue) => {

        dispatch({
            type: SET_QUEUE,
            payload: queue
        });

    }

    return (
        <processQContext.Provider
            value={{
                queue: state.queue,
                runQueue: runQueue,
                setQueue: setQueue
            }}
        >
            {props.children}
        </processQContext.Provider>
    )

}

export default ProcessQState;