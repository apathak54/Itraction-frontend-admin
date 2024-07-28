import axios from 'axios';
//const baseURL = 'http://localhost:8080/api'
const baseURL = 'https://itraction-admin.onrender.com/api'
const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add headers or modify the config before the request is sent
    // For example, you might add an authorization token if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if needed
    // For example, you might log out the user if a 401 Unauthorized response is received
    // if (error.response.status === 401) {
    //   // Handle unauthorized access
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
