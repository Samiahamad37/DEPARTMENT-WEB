import api from './api';
import { Announcement, QueryParams } from '../types/api';

export const announcementService = {
  // Get all announcements
  getAnnouncements: async (params?: QueryParams): Promise<Announcement[]> => {
    const response = await api.get('/announcements/', { params });
    return response.data;
  },

  // Get announcement by ID
  getAnnouncement: async (id: number): Promise<Announcement> => {
    const response = await api.get(`/announcements/${id}/`);
    return response.data;
  },

  // Create new announcement
  createAnnouncement: async (data: Partial<Announcement>): Promise<Announcement> => {
    const response = await api.post('/announcements/', data);
    return response.data;
  },

  // Update announcement
  updateAnnouncement: async (id: number, data: Partial<Announcement>): Promise<Announcement> => {
    const response = await api.put(`/announcements/${id}/`, data);
    return response.data;
  },

  // Delete announcement
  deleteAnnouncement: async (id: number): Promise<void> => {
    await api.delete(`/announcements/${id}/`);
  },
};


