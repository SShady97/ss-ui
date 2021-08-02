import { SERVERS, SET_SERVER } from '../../types';

export default (state, action) => {
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
    }
}