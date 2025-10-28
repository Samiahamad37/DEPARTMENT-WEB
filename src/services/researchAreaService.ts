import api from './api';
import { ResearchArea, QueryParams } from '../types/api';

export const researchAreaService = {
  // Get research areas
  getResearchAreas: async (params?: QueryParams): Promise<ResearchArea[]> => {
    const response = await api.get('/research-areas/', { params });
    return response.data;
  },

  // Get research area by ID
  getResearchAreaById: async (id: number): Promise<ResearchArea> => {
    const response = await api.get(`/research-areas/${id}/`);
    return response.data;
  },

  // Create research area
  createResearchArea: async (data: Partial<ResearchArea>): Promise<ResearchArea> => {
    const response = await api.post('/research-areas/', data);
    return response.data;
  },

  // Update research area
  updateResearchArea: async (id: number, data: Partial<ResearchArea>): Promise<ResearchArea> => {
    const response = await api.put(`/research-areas/${id}/`, data);
    return response.data;
  },

  // Delete research area
  deleteResearchArea: async (id: number): Promise<void> => {
    await api.delete(`/research-areas/${id}/`);
  },
};




