import axios from 'axios'

// peticion post
export const postData = async (userData) => {
    return axios.post('http://localhost:8000/api/v1/recommend', userData)
}

// peticion get al servidor
export const fetchData = async () => {
    return axios.get('http://localhost:8000/api/v1/recommend')
}