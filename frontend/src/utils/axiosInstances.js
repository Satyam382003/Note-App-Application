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
// User APIs
export const signupUser = (data) => API.post("/create-account", data);
export const loginUser = (data) => API.post("/login", data);
export const getUser = () => API.get("/get-user");

// Notes APIs
export const addNote = (data) => API.post("/add-note", data);
export const getAllNotes = () => API.get("/get-all-notes");
export const editNote = (id, data) => API.put(`/edit-note/${id}`, data);
export const deleteNote = (id) => API.delete(`/delete-note/${id}`);
export const updateNotePinned = (id, data) => API.put(`/update-note-pinned/${id}`, data);
export const searchNotes = (query) => API.get(`/search-notes?query=${query}`);

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
