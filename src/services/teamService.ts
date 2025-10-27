import api from './api';
import { Team, QueryParams } from '../types/api';

export const teamService = {
  // Get all team members
  getTeam: async (params?: QueryParams): Promise<Team[]> => {
    const response = await api.get('/team/', { params });
    return response.data;
  },

  // Get team member by ID
  getTeamMember: async (id: number): Promise<Team> => {
    const response = await api.get(`/team/${id}/`);
    return response.data;
  },

  // Create new team member
  createTeamMember: async (data: Partial<Team>): Promise<Team> => {
    const response = await api.post('/team/', data);
    return response.data;
  },

  // Update team member
  updateTeamMember: async (id: number, data: Partial<Team>): Promise<Team> => {
    const response = await api.put(`/team/${id}/`, data);
    return response.data;
  },

  // Delete team member
  deleteTeamMember: async (id: number): Promise<void> => {
    await api.delete(`/team/${id}/`);
  },
};


