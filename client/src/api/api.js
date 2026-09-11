import axios from "axios";

const api = axios.create({
    baseURL: "https://www.studyzen.me/api",
    withCredentials: true,
});

export default api;