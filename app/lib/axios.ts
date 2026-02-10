import axios from 'axios';

const api = axios.create({
  // Your .NET backend base URL
  baseURL: 'http://192.168.10.120:7183/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;