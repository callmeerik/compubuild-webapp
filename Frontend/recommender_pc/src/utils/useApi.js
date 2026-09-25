import axios from 'axios'

export const postData = async (userData) => {
    
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${API_URL}/api/v1/recommend`, userData);
    return response.data; 
}