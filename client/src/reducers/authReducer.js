// authReducer - Records whether or not the user is logged in
import { FETCH_USER } from '../actions/types';
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // empty string is treated as false in JS
        default:
            return state;
    }
}