import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser =  () => {
    return async function(dispatch) {
        const res = await axios.get('/api/user')
        dispatch({ type: FETCH_USER, payload: res }); // dispatch function passed by redux-thunk middleware
    }

};