import { TOKEN } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case TOKEN:
            return {
                ...state,
                token: action.payload
            }
    }
}