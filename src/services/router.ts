// services.ts
"use server"
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5050/api';

// Helper function to get auth headers
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token || '',
    },
    withCredentials: true,
  };
  return config;
};


//
// ✅ AUTH SERVICES
//

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password }, getAuthConfig());
  return response.data;
};

export const registerUser = async (userData: RegisterPayload) => {
  console.log(userData)
  const newUser = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    "phone": "0593191566",
    "region": "Volta Region",
  }
  const response = await axios.post(`${API_URL}/auth/register`, newUser, {
    headers:{
      'Content-Type':"application/json"
    }
  });
  console.log(response)
  return response.data;
};


//
// ✅ ALERT SERVICES
//
export const getAlerts = async (params?: any) => {
  const config = getAuthConfig();
  const response = await axios.get(`${API_URL}/alerts`, { ...config, params });
  return response.data;
};

export const getAlertById = async (id: string) => {
  const response = await axios.get(`${API_URL}/alerts/${id}`, getAuthConfig());
  return response.data;
};

export const createAlert = async (alertData: any) => {
  const response = await axios.post(`${API_URL}/alerts`, alertData, getAuthConfig());
  return response.data;
};

export const updateAlert = async (id: string, alertData: any) => {
  const response = await axios.put(`${API_URL}/alerts/${id}`, alertData, getAuthConfig());
  return response.data;
};

export const deleteAlert = async (id: string) => {
  const response = await axios.delete(`${API_URL}/alerts/${id}`, getAuthConfig());
  return response.data;
};


//
// ✅ REPORT SERVICES
//
export const getReports = async (params?: any) => {
  const config = getAuthConfig();
  const response = await axios.get(`${API_URL}/reports`, { ...config, params });
  return response.data;
};

export const getReportById = async (id: string) => {
  const response = await axios.get(`${API_URL}/reports/${id}`, getAuthConfig());
  return response.data;
};

export const createReport = async (reportData: any) => {
  const response = await axios.post(`${API_URL}/reports`, reportData, getAuthConfig());
  return response.data;
};

export const updateReportStatus = async (id: string, status: string) => {
  const response = await axios.put(`${API_URL}/reports/${id}`, { status }, getAuthConfig());
  return response.data;
};

export const deleteReport = async (id: string) => {
  const response = await axios.delete(`${API_URL}/reports/${id}`, getAuthConfig());
  return response.data;
};