import { SERVERS, SET_SERVER, CLEAN_SERVERS } from '../../types';

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

        default:
            return 'Tipo desconocido';
    }
}

export default serverReducer;