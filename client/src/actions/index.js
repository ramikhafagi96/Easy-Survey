import axios from 'axios';
import fetchUser, { FETCH_USER } from './types';

const fetchUser =  () => {
    return function(dispatch) {
        axios.get('/user')
            .then((res) => dispatch({ type: FETCH_USER, payload: res }));
    }

}