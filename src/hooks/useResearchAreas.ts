import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { researchAreaService } from '../services/researchAreaService';
import { ResearchArea, QueryParams } from '../types/api';

// Query keys
export const researchAreaKeys = {
  all: ['research-areas'] as const,
  lists: () => [...researchAreaKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...researchAreaKeys.lists(), params] as const,
  details: () => [...researchAreaKeys.all, 'detail'] as const,
  detail: (id: number) => [...researchAreaKeys.details(), id] as const,
};

// Get research areas
export const useResearchAreas = (params?: QueryParams) => {
  return useQuery({
    queryKey: researchAreaKeys.list(params),
    queryFn: () => researchAreaService.getResearchAreas(params),
  });
};

// Get research area by ID
export const useResearchAreaById = (id: number) => {
  return useQuery({
    queryKey: researchAreaKeys.detail(id),
    queryFn: () => researchAreaService.getResearchAreaById(id),
    enabled: !!id,
  });
};

// Create research area mutation
export const useCreateResearchArea = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<ResearchArea>) => researchAreaService.createResearchArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: researchAreaKeys.lists() });
    },
  });
};

// Update research area mutation
export const useUpdateResearchArea = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ResearchArea> }) =>
      researchAreaService.updateResearchArea(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: researchAreaKeys.lists() });
      queryClient.invalidateQueries({ queryKey: researchAreaKeys.detail(id) });
    },
  });
};

// Delete research area mutation
export const useDeleteResearchArea = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => researchAreaService.deleteResearchArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: researchAreaKeys.lists() });
    },
  });
};


