import { SET_QUEUE, QUEUES, RESPONSE, LOADING, SET_SQUEUES, LOAD_SQUEUE, LOAD_SQUEUE_ADMIN, CLEAN_ALIAS,
    SAVE_QUEUE, SET_ALERT
} from '../../types';

const processQReducer = (state, action) => {
    switch(action.type) {

        case QUEUES:
            return {
                ...state,
                savedQueues: action.payload
            }

        case SET_QUEUE:
            return {
                ...state,
                queue: action.payload
            }
        
        case RESPONSE:
            return {
                ...state,
                res: action.payload,
                loading: false
            }

        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        
        case SET_SQUEUES:
        return {
            ...state,
            savedQueues: action.payload
        }

        case LOAD_SQUEUE:
        return {
            ...state,
            queue: action.payload[0],
            alias: action.payload[1]
        }

        case LOAD_SQUEUE_ADMIN:
            return {
                ...state,
                queueA: action.payload
            }

        case CLEAN_ALIAS:
        return {
            ...state,
            alias: null
        }

        case SAVE_QUEUE:
        return {
            ...state,
            alias: action.payload.alias,
            alertmsg: action.payload.msg,
            alertstatus: action.payload.status,
            alert: true
        }

        case SET_ALERT:
        return {
            ...state,
            alertmsg: null,
            alert: action.payload
        }

        default:
            return 'Tipo desconocido';
    }
}

export default processQReducer;