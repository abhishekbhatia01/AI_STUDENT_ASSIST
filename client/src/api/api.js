import axios from "axios";

const api = axios.create({
    baseURL: "http://13.51.66.224:5000/api",
    withCredentials: true,
});

export default api;