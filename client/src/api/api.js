import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let refreshPromise = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api.post("/refresh-token").finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const excludedRoutes = ["/login", "/register", "/logout", "/refresh-token"];

    const isExcludedRoute = excludedRoutes.some((route) =>
      originalRequest?.url?.includes(route),
    );

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isExcludedRoute
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        return api(originalRequest);
      } catch (refreshError) {
        const { default: store } = await import("../store/store.js");
        const { logout } = await import("../store/authSlice/authSlice.js");
        store.dispatch(logout());

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
