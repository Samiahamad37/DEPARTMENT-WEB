import api from './api';
import { Programme, QueryParams } from '../types/api';

export const programmeService = {
  // Get programmes
  getProgrammes: async (params?: QueryParams): Promise<Programme[]> => {
    const response = await api.get('/programmes/', { params });
    return response.data;
  },

  // Get programme by ID
  getProgrammeById: async (id: number): Promise<Programme> => {
    const response = await api.get(`/programmes/${id}/`);
    return response.data;
  },

  // Create programme
  createProgramme: async (data: Partial<Programme>): Promise<Programme> => {
    const response = await api.post('/programmes/', data);
    return response.data;
  },

  // Update programme
  updateProgramme: async (id: number, data: Partial<Programme>): Promise<Programme> => {
    const response = await api.put(`/programmes/${id}/`, data);
    return response.data;
  },

  // Delete programme
  deleteProgramme: async (id: number): Promise<void> => {
    await api.delete(`/programmes/${id}/`);
  },
};




