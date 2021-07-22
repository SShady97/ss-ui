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

            const api_url = `${process.env.REACT_APP_API_URL}/api/win-remote-client/exec_users/${3}`;

            console.log(api_url)

            const responseExecUsers = await fetch(api_url, { method: 'GET', headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY0NTQxOTMsIm5iZiI6MTYyNjQ1NDE5MywianRpIjoiOTJkNDhkZDAtNGI1Ni00MDQ3LTgwYzMtNTRmZjQwZDk4MGVjIiwiZXhwIjoxNjI2NDU1MDkzLCJpZGVudGl0eSI6IjY0Njk2NTY3NmYyZTcyNmY2YTYxNzM0MDczNzU2ZDZkNjEyZDczNjM2OTJlNjM2ZjZkIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.c55tftoRy5sbhYegQjaMbyMsVLE0bum0Si5_AQCSUGA'}});
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