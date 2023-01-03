import { startFetch, endFetch, errorFetch } from './statusActions';

import { signin } from '../api/fakeAPI';

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

            const user = await signin(phone, password);

            if (user) {
                dispatch(setAuth(user));
                dispatch(errorFetch(''));
                dispatch(endFetch());
            }
        } catch (error) {
            dispatch(setAuth(null));
            dispatch(errorFetch(error));
            dispatch(endFetch());
        }
    }
}

export { setAuth, fetchAuthAsync };