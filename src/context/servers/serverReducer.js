import { EXEC_USERS, SET_EXEC } from '../../types';

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
    }
}