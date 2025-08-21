import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstances = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://note-app-application.onrender.com"
    timeout: 10000,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },
});

 export const loginUser = (data) => API.post("/login", data);
    export const signupUser = (data) => API.post("/signup", data);
    export const fetchNotes = () => API.get("/api/notes");

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
