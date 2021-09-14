import { SERVERS, SET_SERVER, CLEAN_SERVERS, ADD_SERVER, EDIT_SERVER, DELETE_SERVER } from '../../types';

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
                alert: action.payload.msg
            };
    
        case EDIT_SERVER:
        return {
            ...state,
            alert: action.payload.msg
        };

        case DELETE_SERVER:
                return {
                    ...state,
                    alert: action.payload.msg
                };

        default:
            return 'Tipo desconocido';
    }
}

export default serverReducer;