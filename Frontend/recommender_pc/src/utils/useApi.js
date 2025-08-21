import axios from 'axios'

export const postData = async (userData) => {
    
    const response = await axios.post('http://localhost:8000/api/v1/recommend', userData);
    return response.data; 
}