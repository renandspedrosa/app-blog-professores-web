import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
