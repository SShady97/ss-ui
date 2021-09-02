import React, { useReducer } from 'react';

import { authProvider } from '../../Auth/authProvider';

import parameterReducer from './parameterReducer';
import parameterContext from './parameterContext';

import { PARAMETERS, SET_PARAMETER, CLEAN_PARAMETERS, ADD_PARAMETER } from '../../types';

import getStatus from '../../functions/getStatus';

const ParameterState = props => {
    
    const initialState = {
        parameters : [],
        selected_parameter: null
    }

    const [ state, dispatch ] = useReducer(parameterReducer, initialState)

    const url = `${window.location.protocol}//${window.location.hostname}`;

    const getParameters = async (server_id) => {

        try {
            console.log(server_id)
            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:5000/api/win-remote-client/params/server/${server_id}`;

            const responseParameters = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const resultParameters = await responseParameters.json();

            const { task_id, task_name } = resultParameters;

            let res;
        
            const i = setInterval(async () => {

                res = await getStatus(task_id, task_name);

                console.log(res.status)
                
                if(res.status === 'SUCCESS'){

                    console.log(res.result)

                    res.result.shift();

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

    const getAllParameters = async () => {

        try {

            let token = await authProvider.getIdToken();
            token = token.idToken.rawIdToken;
            
            const api_url = `${url}:8181/data/parameter`;

            const responseParameters = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${token} `}});
            const parameters = await responseParameters.json();

            dispatch({
                type: PARAMETERS,
                payload: parameters
            })
            
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

    const addParameter = async ( formData ) => {

        let token = await authProvider.getIdToken();
        token = token.idToken.rawIdToken;

        const data = {
            param: formData.param,
            cat: formData.cat,
            alias: formData.alias
        }

        const datastore_url = `${url}:8181/data/add/parameter`;

        const responseAddParameter = await fetch(datastore_url, 
                                                { method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'},
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddParameter = responseAddParameter.json();                                        

        dispatch({
            type: ADD_PARAMETER,
            payload: {msg: resultAddParameter.msg }
        })
    }


    return (
        <parameterContext.Provider
            value={{
                parameters: state.parameters,
                selected_parameter: state.selected_parameter,
                getParameters: getParameters,
                getAllParameters: getAllParameters,
                selectParameter: selectParameter,
                cleanParameters: cleanParameters,
                addParameter: addParameter
            }}
        >
            {props.children}
        </parameterContext.Provider>
    )

}

export default ParameterState;