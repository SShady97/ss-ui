import { SCRIPTS, SET_SCRIPTS, CLEAN_SCRIPTS, ADD_SCRIPT } from '../../types';

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
                alert: action.payload.msg
            };

        default:
            return 'Tipo desconocido';
    }
}

export default scriptReducer;