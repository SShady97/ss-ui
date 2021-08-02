import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS } from '../../types';

export default (state, action) => {
    switch(action.type) {

        case EXEC_USERS:
            return {
                ...state,
                exec_users: action.payload
            }
        
        case SET_EXEC:
            return {
                ...state,
                selected_exec: action.payload
            }

        case CLEAN_EXECUSERS:
            return {
                ...state,
                exec_users: [],
                selected_exec: null
            }
    }
}