import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Event } from '../types/api';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await api.get('/events/');
      return response.data;
    },
  });
};

export const useFeaturedEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events', 'featured'],
    queryFn: async () => {
      const response = await api.get('/events/featured/');
      return response.data;
    },
  });
};

