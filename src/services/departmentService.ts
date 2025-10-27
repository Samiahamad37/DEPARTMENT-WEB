import api from './api';
import { DepartmentInfo, QueryParams } from '../types/api';

export const departmentService = {
  // Get department info
  getDepartmentInfo: async (params?: QueryParams): Promise<DepartmentInfo[]> => {
    const response = await api.get('/department-info/', { params });
    return response.data;
  },

  // Get department info by ID
  getDepartmentInfoById: async (id: number): Promise<DepartmentInfo> => {
    const response = await api.get(`/department-info/${id}/`);
    return response.data;
  },

  // Create department info
  createDepartmentInfo: async (data: Partial<DepartmentInfo>): Promise<DepartmentInfo> => {
    const response = await api.post('/department-info/', data);
    return response.data;
  },

  // Update department info
  updateDepartmentInfo: async (id: number, data: Partial<DepartmentInfo>): Promise<DepartmentInfo> => {
    const response = await api.put(`/department-info/${id}/`, data);
    return response.data;
  },

  // Delete department info
  deleteDepartmentInfo: async (id: number): Promise<void> => {
    await api.delete(`/department-info/${id}/`);
  },
};

