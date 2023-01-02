import { combineReducers } from 'redux';

import queueReducer from './queueReducer';

export const rootReducer = combineReducers({
    queueReducer,
});