import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3003',
    timeout: 500,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // ou sessionStorage, dependendo de onde você salva o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default api;