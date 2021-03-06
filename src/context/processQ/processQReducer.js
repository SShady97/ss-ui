import { SET_QUEUE, QUEUES, RESPONSE, LOADING, SET_SQUEUES, LOAD_SQUEUE, LOAD_SQUEUE_ADMIN, CLEAN_ALIAS,
    SAVE_QUEUE, SET_ALERT, AFTER_DELETE, SET_PTOEDIT, DELETE_QUEUE, EDIT_PROCESS, SCHEDULED_EXEC, SEND_EMAIL
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
                queue: [...state.queue, action.payload]
            }
        
        case RESPONSE:
            return {
                ...state,
                res: action.payload.response,
                loading: null,
                txt: action.payload.txt,
                alertmsg: action.payload.msg,
                alertstatus: action.payload.status,
                alert: true
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
            queue: action.payload.data,
            alias: action.payload.alias,
            schedulable: true,
            alertmsg: action.payload.msg,
            alertstatus: action.payload.status,
            alert: true,
            loading: null
        }

        case LOAD_SQUEUE_ADMIN:
            return {
                ...state,
                queueA: action.payload
            }

        case CLEAN_ALIAS:
        return {
            ...state,
            alias: null,
            schedulable: false,
            scheduleDateTime: null
        }

        case SAVE_QUEUE:
        return {
            ...state,
            alias: action.payload.alias,
            alertmsg: action.payload.msg,
            alertstatus: action.payload.status,
            alert: true,
            schedulable: true
        }

        case SET_ALERT:
        return {
            ...state,
            alertmsg: null,
            alert: action.payload
        }

        case AFTER_DELETE:
        return {
            ...state,
            queue: action.payload
        }

        case SET_PTOEDIT:
        return {
            ...state,
            process_ToEdit: action.payload
        }

        case DELETE_QUEUE:
            return {
                ...state,
                alertmsg: action.payload.msg,
                alertstatus: action.payload.status,
                alert: true
            };
            
        case EDIT_PROCESS:
            return {
                ...state,
                queue: action.payload.queue,
                alertmsg: action.payload.msg,
                alertstatus: action.payload.status,
                alert: true
            }

        case SCHEDULED_EXEC:
            return {
                ...state,
                scheduledExec: action.payload
            }

        case SEND_EMAIL:
            return {
                ...state,
                alertmsg: action.payload.msg,
                alertstatus: action.payload.status,
                alert: true
            };

        default:
            return 'Tipo desconocido';
    }
}

export default processQReducer;