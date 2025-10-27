import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bannerService } from '../services/bannerService';
import { Banner, QueryParams } from '../types/api';

// Query keys
export const bannerKeys = {
  all: ['banners'] as const,
  lists: () => [...bannerKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...bannerKeys.lists(), params] as const,
  details: () => [...bannerKeys.all, 'detail'] as const,
  detail: (id: number) => [...bannerKeys.details(), id] as const,
};

// Get all banners
export const useBanners = (params?: QueryParams) => {
  return useQuery({
    queryKey: bannerKeys.list(params),
    queryFn: () => bannerService.getBanners(params),
  });
};

// Get banner by ID
export const useBanner = (id: number) => {
  return useQuery({
    queryKey: bannerKeys.detail(id),
    queryFn: () => bannerService.getBanner(id),
    enabled: !!id,
  });
};

// Create banner mutation
export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Banner>) => bannerService.createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
    },
  });
};

// Update banner mutation
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Banner> }) =>
      bannerService.updateBanner(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bannerKeys.detail(id) });
    },
  });
};

// Delete banner mutation
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => bannerService.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.lists() });
    },
  });
};


