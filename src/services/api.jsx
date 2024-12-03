import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:8000/';
const API_BASE_URL = 'https://backend.blackbeetlescreen.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login page or refresh token
    console.log('Unauthorized, redirecting to login');
    // Implement your logic here
  }
  return Promise.reject(error);
});

export const getTradeCounts = () => api.get('/admin-side/trade-counts/');
export const getTrades = () => api.get('admin-side/trades/');
export const createTrade = (data) => api.post('admin-side/create-trade/', data);
export const updateTrade = (id, data) => api.put(`/admin-side/update-trade/${id}/`, data);


export const updateTradeHistory = async (tradeId, data) => {
  try {
    const response = await api.post(`/admin-side/update-trade/${tradeId}/`, data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating trade history:', error);
    throw error;
  }
};


export default api;

