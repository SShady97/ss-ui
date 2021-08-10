import { PARAMETERS, SET_PARAMETER, CLEAN_PARAMETERS } from '../../types';

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

        default:
            return 'Tipo desconocido';
    }
}

export default parameterReducer;