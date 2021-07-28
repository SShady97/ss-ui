import React, { useReducer } from 'react'

import execuserReducer from './execuserReducer';
import execuserContext from './execurserContext';

import getStatus from '../../functions/getStatus';

const ExecuserState = props => {
    
    const initialState = {
        execusers : []
    }

    const [ state, dispatch ] = useReducer(execuserReducer, initialState)


    const getExecUsers = async () => {

        try {

            console.log(process.env.PORT)

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/exec_users`;

            console.log(api_url)

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': `Bearer ${sessionStorage.getItem(process.env.REACT_APP_SSTORAGE_KEY)}`}});
            const resultExecUsers = await responseExecUsers.json();

            console.log(resultExecUsers);
            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <execuserContext.Provider
            value={{
                execusers: state.execusers,
                getExecUsers: getExecUsers
            }}
        >
            {props.children}
        </execuserContext.Provider>
    )

}

export default ExecuserState;