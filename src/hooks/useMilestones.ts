import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { milestoneService } from '../services/milestoneService';
import { DepartmentMilestone, QueryParams } from '../types/api';

// Query keys
export const milestoneKeys = {
  all: ['milestones'] as const,
  lists: () => [...milestoneKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...milestoneKeys.lists(), params] as const,
  details: () => [...milestoneKeys.all, 'detail'] as const,
  detail: (id: number) => [...milestoneKeys.details(), id] as const,
};

// Get milestones
export const useMilestones = (params?: QueryParams) => {
  return useQuery({
    queryKey: milestoneKeys.list(params),
    queryFn: () => milestoneService.getMilestones(params),
  });
};

// Get milestone by ID
export const useMilestoneById = (id: number) => {
  return useQuery({
    queryKey: milestoneKeys.detail(id),
    queryFn: () => milestoneService.getMilestoneById(id),
    enabled: !!id,
  });
};

// Create milestone mutation
export const useCreateMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<DepartmentMilestone>) => milestoneService.createMilestone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
    },
  });
};

// Update milestone mutation
export const useUpdateMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentMilestone> }) =>
      milestoneService.updateMilestone(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
      queryClient.invalidateQueries({ queryKey: milestoneKeys.detail(id) });
    },
  });
};

// Delete milestone mutation
export const useDeleteMilestone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => milestoneService.deleteMilestone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
    },
  });
};




