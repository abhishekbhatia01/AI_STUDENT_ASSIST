import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(
      "Request:",
      config.method?.toUpperCase(),
      config.url
    );

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const excludedRoutes = [
      "/login",
      "/register",
      "/refresh-token",
      "/getMe",
    ];

    const isExcludedRoute = excludedRoutes.some((route) =>
      originalRequest?.url?.includes(route)
    );

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isExcludedRoute
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/refresh-token");

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;