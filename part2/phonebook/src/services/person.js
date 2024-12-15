import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data).catch((error) => {
        console.error('Error adding new person:', error);
    });

}

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(`Failed to delete person with id ${id}:`, error);
            // Rethrow the error to handle it further in the calling code
            throw error;
        });
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)

}
export default {
    getAll, create, deletePerson, update
}