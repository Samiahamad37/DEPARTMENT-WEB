import api from './api';
import { SocialMedia, QueryParams } from '../types/api';

export const socialMediaService = {
  // Get social media links
  getSocialMedia: async (params?: QueryParams): Promise<SocialMedia[]> => {
    const response = await api.get('/social-media/', { params });
    return response.data;
  },

  // Get social media by ID
  getSocialMediaById: async (id: number): Promise<SocialMedia> => {
    const response = await api.get(`/social-media/${id}/`);
    return response.data;
  },

  // Create social media
  createSocialMedia: async (data: Partial<SocialMedia>): Promise<SocialMedia> => {
    const response = await api.post('/social-media/', data);
    return response.data;
  },

  // Update social media
  updateSocialMedia: async (id: number, data: Partial<SocialMedia>): Promise<SocialMedia> => {
    const response = await api.put(`/social-media/${id}/`, data);
    return response.data;
  },

  // Delete social media
  deleteSocialMedia: async (id: number): Promise<void> => {
    await api.delete(`/social-media/${id}/`);
  },
};

