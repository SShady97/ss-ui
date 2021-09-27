import { SCRIPTS, SET_SCRIPTS, CLEAN_SCRIPTS, ADD_SCRIPT, EDIT_SCRIPT, DELETE_SCRIPT, SET_ALERT_SCRIPT } from '../../types';

const scriptReducer = (state, action) => {
    switch(action.type) {

        case SCRIPTS:
            return {
                ...state,
                scripts: action.payload
            };

        case SET_SCRIPTS:
            return {
                ...state,
                selected_script: action.payload
            };

        case CLEAN_SCRIPTS:
            return {
                ...state,
                scripts: [],
                selected_script: null
            };

        case ADD_SCRIPT:
            return {
                ...state,
                alert_script: true,
                alertmsg_script: action.payload.msg,
                alertstatus_script: action.payload.status
            };

        case EDIT_SCRIPT:
            return {
                ...state,
                alert_script: true,
                alertmsg_script: action.payload.msg,
                alertstatus_script: action.payload.status
            };

        case DELETE_SCRIPT:
            return {
                ...state,
                alert_script: true,
                alertmsg_script: action.payload.msg,
                alertstatus_script: action.payload.status
            };

        case SET_ALERT_SCRIPT:
            return {
                ...state,
                alertmsg_script: null,
                alert_script: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default scriptReducer;