import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsService } from '../services/newsService';
import { News, QueryParams } from '../types/api';

// Query keys
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
  featured: () => [...newsKeys.all, 'featured'] as const,
};

// Get all news
export const useNews = (params?: QueryParams) => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => newsService.getNews(params),
  });
};

// Get news by ID
export const useNewsById = (id: number) => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsService.getNewsById(id),
    enabled: !!id,
  });
};

// Get featured news
export const useFeaturedNews = () => {
  return useQuery({
    queryKey: newsKeys.featured(),
    queryFn: () => newsService.getFeaturedNews(),
  });
};

// Create news mutation
export const useCreateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<News>) => newsService.createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: newsKeys.featured() });
    },
  });
};

// Update news mutation
export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<News> }) =>
      newsService.updateNews(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: newsKeys.featured() });
    },
  });
};

// Delete news mutation
export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => newsService.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: newsKeys.featured() });
    },
  });
};


