import { useQuery } from '@tanstack/react-query';
import { siteSettingsService } from '../services/siteSettingsService';
import { SiteSettings } from '../types/api';

// Query keys
export const siteSettingsKeys = {
  all: ['site-settings'] as const,
  settings: () => [...siteSettingsKeys.all, 'settings'] as const,
};

// Get site settings
export const useSiteSettings = () => {
  return useQuery<SiteSettings>({
    queryKey: siteSettingsKeys.settings(),
    queryFn: () => siteSettingsService.getSettings(),
  });
};

