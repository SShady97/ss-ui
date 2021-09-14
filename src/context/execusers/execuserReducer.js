import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS, ADD_EXECUSER, EDIT_EXECUSER, DELETE_EXECUSER } from '../../types';

const execuserReducer = (state, action) => {
    switch(action.type) {

        case EXEC_USERS:
            return {
                ...state,
                exec_users: action.payload
            };
        
        case SET_EXEC:
            return {
                ...state,
                selected_exec: action.payload
            };

        case CLEAN_EXECUSERS:
            return {
                ...state,
                exec_users: [],
                selected_exec: null
            };

        case ADD_EXECUSER:
            return {
                ...state,
                alert: action.payload.msg
            };

        case EDIT_EXECUSER:
            return {
                ...state,
                alert: action.payload.msg
            };

        case DELETE_EXECUSER:
            return {
                ...state,
                alert: action.payload.msg
            };
        
        default:
            return 'Tipo desconocido';
    }
}

export default execuserReducer;