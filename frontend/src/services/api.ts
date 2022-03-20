import axios from "axios";

// !! TODO : déterminer l'URL de l'API de prod et comment l'appliquer correctement avec les variables d'environnement
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://backend.staging.littlebigroad.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== "/auth/sign-in" &&
      err.response &&
      err.response.status === 401 &&
      !originalConfig._retry
    ) {
      // Access Token was expired
      originalConfig._retry = true;

      return api(originalConfig);
    }

    return Promise.reject(err);
  },
);

export { api, API_URL };
