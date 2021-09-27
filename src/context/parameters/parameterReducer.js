import { PARAMETERS, SET_PARAMETER, CLEAN_PARAMETERS, ADD_PARAMETER, DELETE_PARAMETER, EDIT_PARAMETER, SET_ALERT_PARAMETER } from '../../types';

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
                alert_parameter: true,
                alertmsg_parameter: action.payload.msg,
                alertstatus_parameter: action.payload.status
            };

        case EDIT_PARAMETER:
            return {
                ...state,
                alert_parameter: true,
                alertmsg_parameter: action.payload.msg,
                alertstatus_parameter: action.payload.status
            };

        case DELETE_PARAMETER:
            return {
                ...state,
                alert_parameter: true,
                alertmsg_parameter: action.payload.msg,
                alertstatus_parameter: action.payload.status
            };

        case SET_ALERT_PARAMETER:
            return {
                ...state,
                alertmsg_parameter: null,
                alert_parameter: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default parameterReducer;