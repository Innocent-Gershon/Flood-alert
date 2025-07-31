import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE_URL;
// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // <--- add this line
});
// Add request interceptor to add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, error => Promise.reject(error));
// Auth services
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password
  });
  return response.data;
};
export const registerUser = async userData => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};
// Alert services
export const getAlerts = async params => {
  const response = await api.get('/alerts', {
    params
  });
  return response.data;
};
export const getAlertById = async id => {
  const response = await api.get(`/alerts/${id}`);
  return response.data;
};
export const createAlert = async alertData => {
  const response = await api.post('/alerts', alertData);
  return response.data;
};
export const updateAlert = async (id, alertData) => {
  const response = await api.put(`/alerts/${id}`, alertData);
  return response.data;
};
export const deleteAlert = async id => {
  const response = await api.delete(`/alerts/${id}`);
  return response.data;
};
// Report services
export const getReports = async params => {
  const response = await api.get('/reports', {
    params
  });
  return response.data;
};
export const getReportById = async id => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};
export const createReport = async reportData => {
  const response = await api.post('/reports', reportData);
  return response.data;
};
export const updateReportStatus = async (id, status) => {
  const response = await api.put(`/reports/${id}`, {
    status
  });
  return response.data;
};
export const deleteReport = async id => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};
export default api;