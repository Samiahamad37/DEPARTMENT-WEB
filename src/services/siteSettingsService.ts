import api from './api';
import { SiteSettings } from '../types/api';

export const siteSettingsService = {
  // Get site settings (singleton)
  getSettings: async (): Promise<SiteSettings> => {
    const response = await api.get('/site-settings/');
    return response.data;
  },

  // Update site settings
  updateSettings: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    const response = await api.put('/site-settings/', data);
    return response.data;
  },
};

