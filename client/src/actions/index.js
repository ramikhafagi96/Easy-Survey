import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser =  () => {
    return async function(dispatch) {
        const res = await axios.get('/api/user')
        dispatch({ type: FETCH_USER, payload: res.data }); // dispatch function passed by redux-thunk middleware
    }

};

export const handleToken = (token) => {
    return async function(dispatch) {
        const res = await axios.post('/api/user/payment', token);
        dispatch({ type: FETCH_USER, payload: res.data });
    }
};

export const sumbitSurvey = (values) => {
    return async function(dispatch) {
        const res = await axios.post('/api/survey', values);
        dispatch({ type: FETCH_USER, payload: res.data });
    }
}