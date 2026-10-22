import axios from 'axios';
import { optimizeSiteDataImages } from '../utils/imageOptimizer';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    const envUrl = import.meta.env.VITE_API_URL.trim();
    return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
  }
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${window.location.origin}/api`;
    }
    return `http://${hostname || 'localhost'}:5001/api`;
  }
  return 'https://winera.in/api';
};

const API_BASE_URL = getApiBaseUrl();

export const fetchSiteContent = async (page = null) => {
  try {
    const url = page ? `${API_BASE_URL}/content?page=${page}` : `${API_BASE_URL}/content`;
    const response = await axios.get(url, { timeout: 8000 });
    return optimizeSiteDataImages(response.data);
  } catch (err) {
    console.warn('Backend server response timeout/unavailable, falling back to default site data:', err?.message);
    return {};
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    console.warn('Backend projects endpoint timeout/unavailable:', err?.message);
    return null;
  }
};

export const fetchProjectBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${slug}`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    console.warn(`Backend project by slug (${slug}) endpoint timeout/unavailable:`, err?.message);
    return null;
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

export const mutateContentItem = async ({ sectionKey, action, item, index, matchKey, matchValue }, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  if (!authToken) authToken = 'winera_admin_token_fallback';

  const response = await axios.post(
    `${API_BASE_URL}/admin/content-item`,
    { sectionKey, action, item, index, matchKey, matchValue },
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

// Sitemap Sync API
export const syncSitemapApi = async (token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.post(`${API_BASE_URL}/admin/sitemap/sync`, {}, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

// Arcade Products APIs
export const fetchArcadeProducts = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/arcade-products`, { params, timeout: 10000 });
    return response.data;
  } catch (err) {
    console.warn('Failed to fetch arcade products from API:', err?.message);
    return null;
  }
};

export const fetchArcadeProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/arcade-products/${slug}`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    console.warn(`Failed to fetch arcade product by slug (${slug}):`, err?.message);
    return null;
  }
};

export const createArcadeProductApi = async (data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.post(`${API_BASE_URL}/admin/arcade-products`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const updateArcadeProductApi = async (id, data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.put(`${API_BASE_URL}/admin/arcade-products/${id}`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const deleteArcadeProductApi = async (id, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.delete(`${API_BASE_URL}/admin/arcade-products/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

// VR Games APIs
export const fetchVrGames = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vr-games`, { params, timeout: 10000 });
    return response.data;
  } catch (err) {
    console.warn('Failed to fetch VR games from API:', err?.message);
    return null;
  }
};

export const fetchVrGameBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vr-games/${slug}`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    console.warn(`Failed to fetch VR game by slug (${slug}):`, err?.message);
    return null;
  }
};

export const createVrGameApi = async (data, token) => {
  const response = await axios.post(`${API_BASE_URL}/admin/vr-games`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateVrGameApi = async (id, data, token) => {
  const response = await axios.put(`${API_BASE_URL}/admin/vr-games/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteVrGameApi = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/vr-games/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Blog APIs
export const fetchBlogs = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`, { params, timeout: 10000 });
    return response.data;
  } catch (err) {
    console.warn('Failed to fetch blogs from API:', err?.message);
    return null;
  }
};

export const fetchBlogBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${slug}`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    console.warn(`Failed to fetch blog by slug (${slug}):`, err?.message);
    return null;
  }
};

export const createBlogApi = async (data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.post(`${API_BASE_URL}/admin/blogs`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const updateBlogApi = async (id, data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.put(`${API_BASE_URL}/admin/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const deleteBlogApi = async (id, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.delete(`${API_BASE_URL}/admin/blogs/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

// Project APIs
export const createProjectApi = async (data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.post(`${API_BASE_URL}/admin/projects`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const updateProjectApi = async (id, data, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.put(`${API_BASE_URL}/admin/projects/${id}`, data, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};

export const deleteProjectApi = async (id, token) => {
  let authToken = token;
  if (!authToken) {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('winera_admin') || '{}');
      authToken = savedAdmin.token;
    } catch (e) {}
  }
  const response = await axios.delete(`${API_BASE_URL}/admin/projects/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
};
