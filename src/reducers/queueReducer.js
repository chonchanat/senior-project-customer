const initialState = null

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUEUE':
            return action.payload;
        
            default:
            return state;
    }
}

export default queueReducer;