import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialMediaService } from '../services/socialMediaService';
import { SocialMedia, QueryParams } from '../types/api';

// Query keys
export const socialMediaKeys = {
  all: ['social-media'] as const,
  lists: () => [...socialMediaKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...socialMediaKeys.lists(), params] as const,
  details: () => [...socialMediaKeys.all, 'detail'] as const,
  detail: (id: number) => [...socialMediaKeys.details(), id] as const,
};

// Get social media links
export const useSocialMedia = (params?: QueryParams) => {
  return useQuery({
    queryKey: socialMediaKeys.list(params),
    queryFn: () => socialMediaService.getSocialMedia(params),
  });
};

// Get social media by ID
export const useSocialMediaById = (id: number) => {
  return useQuery({
    queryKey: socialMediaKeys.detail(id),
    queryFn: () => socialMediaService.getSocialMediaById(id),
    enabled: !!id,
  });
};

// Create social media mutation
export const useCreateSocialMedia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<SocialMedia>) => socialMediaService.createSocialMedia(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: socialMediaKeys.lists() });
    },
  });
};

// Update social media mutation
export const useUpdateSocialMedia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SocialMedia> }) =>
      socialMediaService.updateSocialMedia(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: socialMediaKeys.lists() });
      queryClient.invalidateQueries({ queryKey: socialMediaKeys.detail(id) });
    },
  });
};

// Delete social media mutation
export const useDeleteSocialMedia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => socialMediaService.deleteSocialMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: socialMediaKeys.lists() });
    },
  });
};




