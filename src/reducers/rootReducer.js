import { combineReducers } from 'redux';

import authReducer from './authReducer';
import statusReducer from './statusReducer';
import queueReducer from './queueReducer';

export const rootReducer = combineReducers({
    authReducer,
    statusReducer,
    queueReducer,
});