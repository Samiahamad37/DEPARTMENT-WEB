import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { programmeService } from '../services/programmeService';
import { Programme, QueryParams } from '../types/api';

// Query keys
export const programmeKeys = {
  all: ['programmes'] as const,
  lists: () => [...programmeKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...programmeKeys.lists(), params] as const,
  details: () => [...programmeKeys.all, 'detail'] as const,
  detail: (id: number) => [...programmeKeys.details(), id] as const,
};

// Get programmes
export const useProgrammes = (params?: QueryParams) => {
  return useQuery({
    queryKey: programmeKeys.list(params),
    queryFn: () => programmeService.getProgrammes(params),
  });
};

// Get programme by ID
export const useProgrammeById = (id: number) => {
  return useQuery({
    queryKey: programmeKeys.detail(id),
    queryFn: () => programmeService.getProgrammeById(id),
    enabled: !!id,
  });
};

// Create programme mutation
export const useCreateProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Programme>) => programmeService.createProgramme(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programmeKeys.lists() });
    },
  });
};

// Update programme mutation
export const useUpdateProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Programme> }) =>
      programmeService.updateProgramme(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: programmeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: programmeKeys.detail(id) });
    },
  });
};

// Delete programme mutation
export const useDeleteProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => programmeService.deleteProgramme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programmeKeys.lists() });
    },
  });
};


