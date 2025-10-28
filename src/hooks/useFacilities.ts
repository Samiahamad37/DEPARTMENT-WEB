import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Facility } from '../types/api';

export const useFacilities = () => {
  return useQuery<Facility[]>({
    queryKey: ['facilities'],
    queryFn: async () => {
      const response = await api.get('/facilities/');
      return response.data;
    },
  });
};



