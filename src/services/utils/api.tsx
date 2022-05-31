import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})

export let access_token = ''

api.interceptors.request.use((config)=>{
    access_token = localStorage.getItem('access_token')!
    config.headers!['Authorization'] = 'Bearer ' + access_token
    
    return config;
})

export default api;
