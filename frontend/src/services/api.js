import axios from 'axios';

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
  const response = await axios.get(`${API_BASE_URL}/content`);
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
  return response.data;
};

export const updateSectionContent = async (sectionKey, data, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/admin/content`,
    { sectionKey, data },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const uploadImageFile = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE_URL}/admin/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

