import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import parameterReducer from './parameterReducer';
import parameterContext from './parameterContext';

import { PARAMETERS, SET_PARAMETER, CLEAN_PARAMETERS } from '../../types';

import getStatus from '../../functions/getStatus';

const ParameterState = props => {
    
    const initialState = {
        parameters : [],
        selected_parameter: null
    }

    const [ state, dispatch ] = useReducer(parameterReducer, initialState)


    const getParameters = async (server_id) => {

        try {
            console.log(server_id)
            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/params/server/${server_id}`;

            const responseParameters = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultParameters = await responseParameters.json();

            const { task_id, task_name } = resultParameters;

            let res;
        
            const i = setInterval(async () => {

                res = await getStatus(task_id, task_name);

                console.log(res.status)
                
                if(res.status === 'SUCCESS'){

                    console.log(res.result)

                    dispatch({
                        type: PARAMETERS,
                        payload: res.result
                    })

                    stopInterval();
                }
            
            }, 500);

            const stopInterval = () => {
                clearInterval(i);
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    const selectParameter = (parameter) => {
        dispatch({
            type: SET_PARAMETER,
            payload: parameter
        })
    }

    const cleanParameters = () => {
        dispatch({
            type: CLEAN_PARAMETERS
        })
    }


    return (
        <parameterContext.Provider
            value={{
                parameters: state.parameters,
                selected_parameter: state.selected_parameter,
                getParameters: getParameters,
                selectParameter: selectParameter,
                cleanParameters: cleanParameters
            }}
        >
            {props.children}
        </parameterContext.Provider>
    )

}

export default ParameterState;