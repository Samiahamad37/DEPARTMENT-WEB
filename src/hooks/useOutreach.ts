import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { OutreachInitiative } from '../types/api';

export const useOutreachInitiatives = () => {
  return useQuery<OutreachInitiative[]>({
    queryKey: ['outreach'],
    queryFn: async () => {
      const response = await api.get('/outreach/');
      return response.data;
    },
  });
};



