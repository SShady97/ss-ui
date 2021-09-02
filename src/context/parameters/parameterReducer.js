import { PARAMETERS, SET_PARAMETER, CLEAN_PARAMETERS, ADD_PARAMETER, DELETE_PARAMETER } from '../../types';

const parameterReducer = (state, action) => {
    switch(action.type) {

        case PARAMETERS:
            return {
                ...state,
                parameters: action.payload
            };

        case SET_PARAMETER:
            return {
                ...state,
                selected_parameter: action.payload
            };
        
        case CLEAN_PARAMETERS:
            return {
                ...state,
                parameters: [],
                selected_parameter: null
            };

        case ADD_PARAMETER:
            return {
                ...state,
                alert: action.payload.msg
            };

        case DELETE_PARAMETER:
            return {
                ...state,
                alert: action.payload.msg
            };

        default:
            return 'Tipo desconocido';
    }
}

export default parameterReducer;