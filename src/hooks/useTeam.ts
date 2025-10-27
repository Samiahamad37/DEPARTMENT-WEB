import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '../services/teamService';
import { Team, QueryParams } from '../types/api';

// Query keys
export const teamKeys = {
  all: ['team'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...teamKeys.lists(), params] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: number) => [...teamKeys.details(), id] as const,
};

// Get team members
export const useTeam = (params?: QueryParams) => {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: () => teamService.getTeam(params),
  });
};

// Get team member by ID
export const useTeamMember = (id: number) => {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamService.getTeamMember(id),
    enabled: !!id,
  });
};

// Create team member mutation
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Team>) => teamService.createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};

// Update team member mutation
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Team> }) =>
      teamService.updateTeamMember(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(id) });
    },
  });
};

// Delete team member mutation
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => teamService.deleteTeamMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};


