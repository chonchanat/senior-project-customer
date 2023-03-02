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
        return response.data.queue;
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
    console.log(data)
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

export { createQueue, getOneQueue, getIncomingQueue, getAllQueue, startQueue }