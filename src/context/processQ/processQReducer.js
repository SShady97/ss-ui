import { SET_QUEUE, RUN_QUEUE } from '../../types';

const processQReducer = (state, action) => {
    switch(action.type) {

        case SET_QUEUE:
            return {
                ...state,
                queue: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default processQReducer;