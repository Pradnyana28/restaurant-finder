import {
    FETCH_MERCHANT
} from '../actions/types';

const INITIAL_STATE = {
    result: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_MERCHANT:
            return action.payload;
    
        default:
            return state;
    }
}