import api from './api';
import { News, QueryParams } from '../types/api';

export const newsService = {
  // Get all news
  getNews: async (params?: QueryParams): Promise<News[]> => {
    const response = await api.get('/news/', { params });
    return response.data;
  },

  // Get news by ID
  getNewsById: async (id: number): Promise<News> => {
    const response = await api.get(`/news/${id}/`);
    return response.data;
  },

  // Get featured news
  getFeaturedNews: async (): Promise<News[]> => {
    const response = await api.get('/news/featured/');
    return response.data;
  },

  // Create new news
  createNews: async (data: Partial<News>): Promise<News> => {
    const response = await api.post('/news/', data);
    return response.data;
  },

  // Update news
  updateNews: async (id: number, data: Partial<News>): Promise<News> => {
    const response = await api.put(`/news/${id}/`, data);
    return response.data;
  },

  // Delete news
  deleteNews: async (id: number): Promise<void> => {
    await api.delete(`/news/${id}/`);
  },
};


