import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../hooks/navigationRef";

import {
  AUTH_ACCESS_TOKEN_PREFIXES,
  API_URL,
  AUTH_REFRESH_TOKEN_PREFIXES,
  AUTH_REFRESH_TOKEN_ADDRESS,
} from "../utils/baseUrls";
// import { disconnectAndClearWebSocket } from "../store/dashboardStreamingApi";

const api = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(AUTH_REFRESH_TOKEN_PREFIXES);
  if (!refreshToken) {
    Error("No refresh token found");
  }
  try {
    const res = await axios.post(`${API_URL}${AUTH_REFRESH_TOKEN_ADDRESS}`, {
      [AUTH_REFRESH_TOKEN_PREFIXES]: refreshToken,
    });

    if (res.status === 200) {
      await AsyncStorage.setItem(
        AUTH_ACCESS_TOKEN_PREFIXES,
        res.data[AUTH_ACCESS_TOKEN_PREFIXES]
      );

      await AsyncStorage.setItem(
        AUTH_REFRESH_TOKEN_PREFIXES,
        res.data[AUTH_REFRESH_TOKEN_PREFIXES]
      );

      return res.data[AUTH_ACCESS_TOKEN_PREFIXES];
    } else {
      await AsyncStorage.removeItem(AUTH_ACCESS_TOKEN_PREFIXES);
      await AsyncStorage.removeItem(AUTH_REFRESH_TOKEN_PREFIXES);
      //disconnectAndClearWebSocket();
      navigate("Login");
    }
  } catch (error) {
    await AsyncStorage.removeItem(AUTH_ACCESS_TOKEN_PREFIXES);
    await AsyncStorage.removeItem(AUTH_REFRESH_TOKEN_PREFIXES);
    //disconnectAndClearWebSocket();
    navigate("Login");
  }
};

api.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem(AUTH_ACCESS_TOKEN_PREFIXES);

    if (token) {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration - now < 30) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshToken()
            .then((newToken) => {
              processQueue(null, newToken);
            })
            .catch((error) => {
              processQueue(error, null);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        const retryOriginalRequest = new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        try {
          const newToken = await retryOriginalRequest;
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    } else {
      // await AsyncStorage.removeItem(AUTH_ACCESS_TOKEN_PREFIXES);
      // await AsyncStorage.removeItem(AUTH_REFRESH_TOKEN_PREFIXES);
      // navigate("Login");
    }

    token = await AsyncStorage.getItem(AUTH_ACCESS_TOKEN_PREFIXES);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = await AsyncStorage.getItem(
          AUTH_REFRESH_TOKEN_PREFIXES
        );

        if (!refreshTokenValue) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          `${API_URL}${AUTH_REFRESH_TOKEN_ADDRESS}`,
          {
            [AUTH_REFRESH_TOKEN_PREFIXES]: refreshTokenValue,
          }
        );

        if (res.status === 200) {
          await AsyncStorage.setItem(
            AUTH_ACCESS_TOKEN_PREFIXES,
            res.data[AUTH_ACCESS_TOKEN_PREFIXES]
          );
          await AsyncStorage.setItem(
            AUTH_REFRESH_TOKEN_PREFIXES,
            res.data[AUTH_REFRESH_TOKEN_PREFIXES]
          );

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data[AUTH_ACCESS_TOKEN_PREFIXES]}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        await AsyncStorage.removeItem(AUTH_ACCESS_TOKEN_PREFIXES);
        await AsyncStorage.removeItem(AUTH_REFRESH_TOKEN_PREFIXES);
        //disconnectAndClearWebSocket();
        navigate("Login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;