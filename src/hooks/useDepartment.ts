import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '../services/departmentService';
import { DepartmentInfo, QueryParams } from '../types/api';

// Query keys
export const departmentKeys = {
  all: ['department-info'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...departmentKeys.lists(), params] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: number) => [...departmentKeys.details(), id] as const,
};

// Get department info
export const useDepartmentInfo = (params?: QueryParams) => {
  return useQuery({
    queryKey: departmentKeys.list(params),
    queryFn: () => departmentService.getDepartmentInfo(params),
  });
};

// Get department info by ID
export const useDepartmentInfoById = (id: number) => {
  return useQuery({
    queryKey: departmentKeys.detail(id),
    queryFn: () => departmentService.getDepartmentInfoById(id),
    enabled: !!id,
  });
};

// Create department info mutation
export const useCreateDepartmentInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<DepartmentInfo>) => departmentService.createDepartmentInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};

// Update department info mutation
export const useUpdateDepartmentInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentInfo> }) =>
      departmentService.updateDepartmentInfo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: departmentKeys.detail(id) });
    },
  });
};

// Delete department info mutation
export const useDeleteDepartmentInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => departmentService.deleteDepartmentInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};

