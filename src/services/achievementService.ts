import api from './api';
import { DepartmentAchievement, QueryParams } from '../types/api';

export const achievementService = {
  // Get achievements
  getAchievements: async (params?: QueryParams): Promise<DepartmentAchievement[]> => {
    const response = await api.get('/achievements/', { params });
    return response.data;
  },

  // Get achievement by ID
  getAchievementById: async (id: number): Promise<DepartmentAchievement> => {
    const response = await api.get(`/achievements/${id}/`);
    return response.data;
  },

  // Create achievement
  createAchievement: async (data: Partial<DepartmentAchievement>): Promise<DepartmentAchievement> => {
    const response = await api.post('/achievements/', data);
    return response.data;
  },

  // Update achievement
  updateAchievement: async (id: number, data: Partial<DepartmentAchievement>): Promise<DepartmentAchievement> => {
    const response = await api.put(`/achievements/${id}/`, data);
    return response.data;
  },

  // Delete achievement
  deleteAchievement: async (id: number): Promise<void> => {
    await api.delete(`/achievements/${id}/`);
  },
};

