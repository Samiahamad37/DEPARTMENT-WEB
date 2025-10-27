import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/contactService';
import { ContactInfo, QueryParams } from '../types/api';

// Query keys
export const contactKeys = {
  all: ['contact-info'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...contactKeys.lists(), params] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: number) => [...contactKeys.details(), id] as const,
};

// Get contact info
export const useContactInfo = (params?: QueryParams) => {
  return useQuery({
    queryKey: contactKeys.list(params),
    queryFn: () => contactService.getContactInfo(params),
  });
};

// Get contact info by ID
export const useContactInfoById = (id: number) => {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getContactInfoById(id),
    enabled: !!id,
  });
};

// Create contact info mutation
export const useCreateContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<ContactInfo>) => contactService.createContactInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};

// Update contact info mutation
export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ContactInfo> }) =>
      contactService.updateContactInfo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contactKeys.detail(id) });
    },
  });
};

// Delete contact info mutation
export const useDeleteContactInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => contactService.deleteContactInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};


