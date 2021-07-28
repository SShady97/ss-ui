import React, { useReducer } from 'react'

import loginReducer from './loginReducer';
import loginContext from './loginContext';

import { TOKEN } from '../../types';


const LoginState = props => {
    
    const initialState = {
        token : sessionStorage.getItem(process.env.REACT_APP_SSTORAGE_KEY)
    }

    const [ state, dispatch ] = useReducer(loginReducer, initialState)


    const setToken = (token) => {
        dispatch({
            type: TOKEN,
            payload: token
        })
    }


    return (
        <loginContext.Provider
            value={{
                token: state.token,
                setToken: setToken
            }}
        >
            {props.children}
        </loginContext.Provider>
    )

}

export default LoginState;