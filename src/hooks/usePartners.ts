import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Partner } from '../types/api';

export const usePartners = () => {
  return useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await api.get('/partners/');
      return response.data;
    },
  });
};

