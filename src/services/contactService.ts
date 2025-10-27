import api from './api';
import { ContactInfo, QueryParams } from '../types/api';

export const contactService = {
  // Get contact info
  getContactInfo: async (params?: QueryParams): Promise<ContactInfo[]> => {
    const response = await api.get('/contact-info/', { params });
    return response.data;
  },

  // Get contact info by ID
  getContactInfoById: async (id: number): Promise<ContactInfo> => {
    const response = await api.get(`/contact-info/${id}/`);
    return response.data;
  },

  // Create contact info
  createContactInfo: async (data: Partial<ContactInfo>): Promise<ContactInfo> => {
    const response = await api.post('/contact-info/', data);
    return response.data;
  },

  // Update contact info
  updateContactInfo: async (id: number, data: Partial<ContactInfo>): Promise<ContactInfo> => {
    const response = await api.put(`/contact-info/${id}/`, data);
    return response.data;
  },

  // Delete contact info
  deleteContactInfo: async (id: number): Promise<void> => {
    await api.delete(`/contact-info/${id}/`);
  },
};

