import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstances = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
    },
});

axiosInstances.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstances;
