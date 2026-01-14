import axios from "axios";
import { userService } from "./userService";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";

if (!baseURL && process.env.NODE_ENV === 'development') {
  console.warn('REACT_APP_API_URL is not set — API requests will be sent to the same origin');
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header and log requests in dev
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = userService.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore
    }

    if (process.env.NODE_ENV === 'development') {
      try {
        const method = (config.method || 'GET').toUpperCase();
        const url = `${config.baseURL || ''}${config.url}`;
        console.debug(`[apiClient] ${method} ${url}`);
      } catch (e) {
        // ignore
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor to handle 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      // auto logout on unauthorized
      try {
        await userService.logout();
      } catch (e) {
        // ignore
      }
      // Optionally you could emit an event to redirect user to login
      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
