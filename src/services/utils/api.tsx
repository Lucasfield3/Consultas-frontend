import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const access_token = window.localStorage.getItem('access_token');

if(access_token){
    api.defaults.headers.common = {
        'Authorization': `Bearer ${access_token}`,
    }
}

export default api;
