import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementService } from '../services/achievementService';
import { DepartmentAchievement, QueryParams } from '../types/api';

// Query keys
export const achievementKeys = {
  all: ['achievements'] as const,
  lists: () => [...achievementKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...achievementKeys.lists(), params] as const,
  details: () => [...achievementKeys.all, 'detail'] as const,
  detail: (id: number) => [...achievementKeys.details(), id] as const,
};

// Get achievements
export const useAchievements = (params?: QueryParams) => {
  return useQuery({
    queryKey: achievementKeys.list(params),
    queryFn: () => achievementService.getAchievements(params),
  });
};

// Get achievement by ID
export const useAchievementById = (id: number) => {
  return useQuery({
    queryKey: achievementKeys.detail(id),
    queryFn: () => achievementService.getAchievementById(id),
    enabled: !!id,
  });
};

// Create achievement mutation
export const useCreateAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<DepartmentAchievement>) => achievementService.createAchievement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: achievementKeys.lists() });
    },
  });
};

// Update achievement mutation
export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentAchievement> }) =>
      achievementService.updateAchievement(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: achievementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: achievementKeys.detail(id) });
    },
  });
};

// Delete achievement mutation
export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => achievementService.deleteAchievement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: achievementKeys.lists() });
    },
  });
};




