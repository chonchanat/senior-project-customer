import { startFetch, endFetch, errorFetch } from './statusActions';

import { signin } from '../api/userAPI';

import Cookies from 'js-cookie';

const setAuth = (data) => {
    return {
        type: 'SET_AUTH',
        payload: data,
    }
}

function fetchAuthAsync(phone, password) {
    return async function (dispatch) {
        try {
            dispatch(startFetch());
            dispatch(errorFetch(''));

            const user = await signin(phone, password);
            if (user) {
                dispatch(setAuth(user.data.user));
                Cookies.set('accesstoken', user.data.accesstoken, { expires: 1 });
                Cookies.set('userCookie', JSON.stringify(user.data.user), { expires: 1 });
                dispatch(errorFetch(''));
                dispatch(endFetch());
            }
        } catch (error) {
            console.log(error)
            dispatch(setAuth(null));
            dispatch(errorFetch(error.message));
            dispatch(endFetch());
        }
    }
}

export { setAuth, fetchAuthAsync };