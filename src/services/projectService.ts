import api from './api';
import { Project, QueryParams } from '../types/api';

export const projectService = {
  // Get all projects
  getProjects: async (params?: QueryParams): Promise<Project[]> => {
    const response = await api.get('/projects/', { params });
    return response.data;
  },

  // Get project by ID
  getProjectById: async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  },

  // Get featured projects
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects/featured/');
    return response.data;
  },

  // Create new project
  createProject: async (data: Partial<Project>): Promise<Project> => {
    const response = await api.post('/projects/', data);
    return response.data;
  },

  // Update project
  updateProject: async (id: number, data: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}/`, data);
    return response.data;
  },

  // Delete project
  deleteProject: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}/`);
  },
};


