import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementService } from '../services/announcementService';
import { Announcement, QueryParams } from '../types/api';

// Query keys
export const announcementKeys = {
  all: ['announcements'] as const,
  lists: () => [...announcementKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...announcementKeys.lists(), params] as const,
  details: () => [...announcementKeys.all, 'detail'] as const,
  detail: (id: number) => [...announcementKeys.details(), id] as const,
  featured: () => [...announcementKeys.all, 'featured'] as const,
};

// Get all announcements
export const useAnnouncements = (params?: QueryParams) => {
  return useQuery({
    queryKey: announcementKeys.list(params),
    queryFn: () => announcementService.getAnnouncements(params),
  });
};

// Get announcement by ID
export const useAnnouncementById = (id: number) => {
  return useQuery({
    queryKey: announcementKeys.detail(id),
    queryFn: () => announcementService.getAnnouncement(id),
    enabled: !!id,
  });
};

// Get featured announcements
export const useFeaturedAnnouncements = () => {
  return useQuery({
    queryKey: announcementKeys.featured(),
    queryFn: () => announcementService.getAnnouncements({ is_featured: true }),
  });
};

// Create announcement mutation
export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Announcement>) => announcementService.createAnnouncement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: announcementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: announcementKeys.featured() });
    },
  });
};

// Update announcement mutation
export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Announcement> }) =>
      announcementService.updateAnnouncement(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: announcementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: announcementKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: announcementKeys.featured() });
    },
  });
};

// Delete announcement mutation
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => announcementService.deleteAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: announcementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: announcementKeys.featured() });
    },
  });
};
