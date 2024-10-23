// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela sua URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
