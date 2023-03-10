import axios, { getToken } from "./index";

async function createQueue(data) {
    try {
        const response = await axios.post(`/queue`, data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data.queue._id;
    } catch (error) {
        console.log(error);
    }
}

async function createManualQueue(data) {
    try {
        const response = await axios.post(`/queue/specific-round`, data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data.queue._id;
    } catch (error) {
        console.log(error);
    }
}

async function unBookQueue(data) {
    try {
        await axios.post(`/queue/cancel`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            })
    } catch (error) {
        console.log(error);
    }
}

async function getOneQueue(data) {
    try {
        const response = await axios.get(`/queue/id/${data}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data.queue;
    } catch (error) {
        console.log(error);
    }
}

async function getIncomingQueue(data) {
    try {
        const response = await axios.get(`/queue/firstqueue/${data}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        if (response.data.queue.activityCode) return response.data.queue;
        else return null;
    } catch (error) {
        console.log(error);
    }
}

async function getAllQueue(data) {
    try {
        const response = await axios.get(`/queue/active/${data}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data.queue;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function startQueue(data) {
    try {
        await axios.post(`/queue/start`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            })
    } catch (error) {
        console.log(error);
    }
}

export { createQueue, createManualQueue, unBookQueue, getOneQueue, getIncomingQueue, getAllQueue, startQueue }