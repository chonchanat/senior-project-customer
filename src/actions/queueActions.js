const setQueue = (data) => {
    return {
        type: 'SET_QUEUE',
        payload: data,
    }
}

export { setQueue };