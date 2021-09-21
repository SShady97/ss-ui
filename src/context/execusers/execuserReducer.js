import { EXEC_USERS, SET_EXEC, CLEAN_EXECUSERS, ADD_EXECUSER, EDIT_EXECUSER, DELETE_EXECUSER, SET_ALERT_EXECUSER } from '../../types';

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
                alert_exec: true,
                alertmsg_exec: action.payload.msg,
                alertstatus_exec: action.payload.status
            };

        case EDIT_EXECUSER:
            return {
                ...state,
                alert_exec: true,
                alertmsg_exec: action.payload.msg,
                alertstatus_exec: action.payload.status
            };

        case DELETE_EXECUSER:
            return {
                ...state,
                alert_exec: true,
                alertmsg_exec: action.payload.msg,
                alertstatus_exec: action.payload.status
            };
    
        case SET_ALERT_EXECUSER:
            return {
                ...state,
                alertmsg_exec: null,
                alert_exec: action.payload
            }
        
        default:
            return 'Tipo desconocido';
    }
}

export default execuserReducer;