import axios from 'axios';

const API_BASE_URL = 'https://blogify-fr8k.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};


export const blogAPI = {
  getAllBlogs: (page = 1) => api.get(`/blogs?page=${page}`),
  getBlog: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  getUserBlogs: () => api.get('/blogs/user/me'),
  getAllBlogsAdmin: () => api.get('/blogs/admin/all'),
};

export const adminAPI = {
  getUsers: (page = 1) => api.get(`/admin/users?page=${page}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  getStats: () => api.get('/admin/stats'),
};

export const uploadAPI = {
  uploadImage: (formData) => {
    const uploadApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    uploadApi.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return uploadApi.post('/upload/upload', formData);
  },
  deleteImage: (filename) => api.delete(`/upload/delete/${filename}`),
};

export default api;