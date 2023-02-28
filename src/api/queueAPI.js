import axios, { getToken } from "./index";

async function createQueue(data) {
    try {
        const response = await axios.post(`/queue`, data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        })
        console.log(response.data.queue)
        return response.data.queue._id;
    } catch (error) {
        console.log(error);
    }
}

export { createQueue }