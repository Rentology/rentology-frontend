import axios from 'axios'
import Cookies from 'js-cookie'
export const API_URL = `http://localhost:80/api/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

export default $api;