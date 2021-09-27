import { SERVERS, SET_SERVER, CLEAN_SERVERS, ADD_SERVER, EDIT_SERVER, DELETE_SERVER, SET_ALERT_SERVER } from '../../types';

const serverReducer = (state, action) => {
    switch(action.type) {

        case SERVERS:
            return {
                ...state,
                servers: action.payload
            }
        
        case SET_SERVER:
            return {
                ...state,
                selected_server: action.payload
            }
        
        case CLEAN_SERVERS:
            return {
                ...state,
                servers: [],
                selected_server: null
            };

        case ADD_SERVER:
            return {
                ...state,
                alert_server: true,
                alertmsg_server: action.payload.msg,
                alertstatus_server: action.payload.status
            };

        case EDIT_SERVER:
            return {
                ...state,
                alert_server: true,
                alertmsg_server: action.payload.msg,
                alertstatus_server: action.payload.status
            };

        case DELETE_SERVER:
            return {
                ...state,
                alert_server: true,
                alertmsg_server: action.payload.msg,
                alertstatus_server: action.payload.status
            };

        case SET_ALERT_SERVER:
        return {
            ...state,
            alertmsg_server: null,
            alert_server: action.payload
        }

        default:
            return 'Tipo desconocido';
    }
}

export default serverReducer;