
import axios from 'axios'

const api = axios.create({
    baseURL:'https://api-consultas.herokuapp.com',
})

export const access_token = window.localStorage.getItem('access_token');

if(access_token){
    api.defaults.headers.common = {
        'Authorization': `bearer ${access_token}`,
    }
}

export default api;
