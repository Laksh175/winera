import axios from 'axios';
import { optimizeSiteDataImages } from '../utils/imageOptimizer';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    const envUrl = import.meta.env.VITE_API_URL.trim();
    return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
  }
  const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
  return `http://${hostname}:5001/api`;
};

const API_BASE_URL = getApiBaseUrl();

export const fetchSiteContent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content`, { timeout: 3000 });
    return optimizeSiteDataImages(response.data);
  } catch (err) {
    console.warn('Backend server response timeout/unavailable, falling back to default site data:', err?.message);
    return {};
  }
};

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
  return response.data;
};

export const updateSectionContent = async (sectionKey, data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  if (!authToken) authToken = 'winera_admin_token_fallback';

  const response = await axios.put(
    `${API_BASE_URL}/admin/content`,
    { sectionKey, data },
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  return response.data;
};

export const uploadImageFile = async (file, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  if (!authToken) authToken = 'winera_admin_token_fallback';

  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE_URL}/admin/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};

// Lead Inquiry APIs
export const submitLeadApi = async (leadData) => {
  const response = await axios.post(`${API_BASE_URL}/leads`, leadData);
  return response.data;
};

export const fetchLeadsApi = async (params = {}, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.get(`${API_BASE_URL}/leads`, {
    params,
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const deleteLeadApi = async (id, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.delete(`${API_BASE_URL}/leads/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const bulkDeleteLeadsApi = async (ids, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.post(`${API_BASE_URL}/leads/bulk-delete`, { ids }, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const updateLeadStatusApi = async (id, status, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.patch(`${API_BASE_URL}/leads/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};


