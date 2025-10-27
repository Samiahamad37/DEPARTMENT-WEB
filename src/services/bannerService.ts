import api from './api';
import { Banner, QueryParams } from '../types/api';

export const bannerService = {
  // Get all banners
  getBanners: async (params?: QueryParams): Promise<Banner[]> => {
    const response = await api.get('/banners/', { params });
    return response.data;
  },

  // Get banner by ID
  getBanner: async (id: number): Promise<Banner> => {
    const response = await api.get(`/banners/${id}/`);
    return response.data;
  },

  // Create new banner
  createBanner: async (data: Partial<Banner>): Promise<Banner> => {
    const response = await api.post('/banners/', data);
    return response.data;
  },

  // Update banner
  updateBanner: async (id: number, data: Partial<Banner>): Promise<Banner> => {
    const response = await api.put(`/banners/${id}/`, data);
    return response.data;
  },

  // Delete banner
  deleteBanner: async (id: number): Promise<void> => {
    await api.delete(`/banners/${id}/`);
  },
};


