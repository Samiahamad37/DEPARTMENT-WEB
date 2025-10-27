import api from './api';
import { DepartmentMilestone, QueryParams } from '../types/api';

export const milestoneService = {
  // Get milestones
  getMilestones: async (params?: QueryParams): Promise<DepartmentMilestone[]> => {
    const response = await api.get('/milestones/', { params });
    return response.data;
  },

  // Get milestone by ID
  getMilestoneById: async (id: number): Promise<DepartmentMilestone> => {
    const response = await api.get(`/milestones/${id}/`);
    return response.data;
  },

  // Create milestone
  createMilestone: async (data: Partial<DepartmentMilestone>): Promise<DepartmentMilestone> => {
    const response = await api.post('/milestones/', data);
    return response.data;
  },

  // Update milestone
  updateMilestone: async (id: number, data: Partial<DepartmentMilestone>): Promise<DepartmentMilestone> => {
    const response = await api.put(`/milestones/${id}/`, data);
    return response.data;
  },

  // Delete milestone
  deleteMilestone: async (id: number): Promise<void> => {
    await api.delete(`/milestones/${id}/`);
  },
};

