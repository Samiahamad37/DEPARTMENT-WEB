import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  adminAuthService, adminUserService, adminDashboardService,
  adminNewsService, adminBannerService, adminTeamService,
  adminProjectService, adminProgrammeService, adminResearchAreaService,
  adminDepartmentInfoService, adminContactInfoService, adminSocialMediaService,
  adminMilestoneService, adminAchievementService, adminNewsletterService
} from '../services/adminService';
import { 
  AdminUser, AdminLoginRequest, ChangePasswordRequest,
  CreateAdminUserRequest, AdminDashboardStats, AdminNews, AdminBanner,
  AdminTeam, AdminProject, AdminProgramme, AdminResearchArea,
  AdminDepartmentInfo, AdminContactInfo, AdminSocialMedia,
  AdminDepartmentMilestone, AdminDepartmentAchievement,
  AdminNewsletterSubscription
} from '../types/admin';
import { QueryParams } from '../types/api';

// Query Keys
export const adminKeys = {
  all: ['admin'] as const,
  auth: () => [...adminKeys.all, 'auth'] as const,
  users: () => [...adminKeys.all, 'users'] as const,
  user: (id: number) => [...adminKeys.users(), id] as const,
  dashboard: () => [...adminKeys.all, 'dashboard'] as const,
  content: (type: string) => [...adminKeys.all, 'content', type] as const,
  contentItem: (type: string, id: number) => [...adminKeys.content(type), id] as const,
};

// Authentication Hooks
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: (credentials: AdminLoginRequest) => adminAuthService.login(credentials),
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => adminAuthService.changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.auth() });
    },
  });
};

// Admin Users Hooks
export const useAdminUsers = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: () => adminUserService.getUsers(params),
  });
};

export const useAdminUserById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.user(id),
    queryFn: () => adminUserService.getUserById(id),
    enabled: !!id,
  });
};

export const useCreateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminUserRequest) => adminUserService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminUser> }) =>
      adminUserService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.user(id) });
    },
  });
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminUserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

// Dashboard Hooks
export const useAdminDashboardStats = () => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: () => adminDashboardService.getStats(),
  });
};

// Content Management Hooks - News
export const useAdminNews = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('news'),
    queryFn: () => adminNewsService.getNews(params),
  });
};

export const useAdminNewsById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('news', id),
    queryFn: () => adminNewsService.getNewsById(id),
    enabled: !!id,
  });
};

export const useCreateAdminNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminNews>) => adminNewsService.createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('news') });
    },
  });
};

export const useUpdateAdminNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminNews> }) =>
      adminNewsService.updateNews(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('news') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('news', id) });
    },
  });
};

export const useDeleteAdminNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminNewsService.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('news') });
    },
  });
};

// Content Management Hooks - Banners
export const useAdminBanners = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('banners'),
    queryFn: () => adminBannerService.getBanners(params),
  });
};

export const useAdminBannerById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('banners', id),
    queryFn: () => adminBannerService.getBannerById(id),
    enabled: !!id,
  });
};

export const useCreateAdminBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminBanner>) => adminBannerService.createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('banners') });
    },
  });
};

export const useUpdateAdminBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminBanner> }) =>
      adminBannerService.updateBanner(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('banners') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('banners', id) });
    },
  });
};

export const useDeleteAdminBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminBannerService.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('banners') });
    },
  });
};

// Content Management Hooks - Team
export const useAdminTeam = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('team'),
    queryFn: () => adminTeamService.getTeam(params),
  });
};

export const useAdminTeamById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('team', id),
    queryFn: () => adminTeamService.getTeamById(id),
    enabled: !!id,
  });
};

export const useCreateAdminTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminTeam>) => adminTeamService.createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('team') });
    },
  });
};

export const useUpdateAdminTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminTeam> }) =>
      adminTeamService.updateTeamMember(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('team') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('team', id) });
    },
  });
};

export const useDeleteAdminTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminTeamService.deleteTeamMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('team') });
    },
  });
};

// Content Management Hooks - Projects
export const useAdminProjects = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('projects'),
    queryFn: () => adminProjectService.getProjects(params),
  });
};

export const useAdminProjectById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('projects', id),
    queryFn: () => adminProjectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateAdminProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminProject>) => adminProjectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('projects') });
    },
  });
};

export const useUpdateAdminProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminProject> }) =>
      adminProjectService.updateProject(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('projects') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('projects', id) });
    },
  });
};

export const useDeleteAdminProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminProjectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('projects') });
    },
  });
};

// Content Management Hooks - Programmes
export const useAdminProgrammes = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('programmes'),
    queryFn: () => adminProgrammeService.getProgrammes(params),
  });
};

export const useAdminProgrammeById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('programmes', id),
    queryFn: () => adminProgrammeService.getProgrammeById(id),
    enabled: !!id,
  });
};

export const useCreateAdminProgramme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminProgramme>) => adminProgrammeService.createProgramme(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('programmes') });
    },
  });
};

export const useUpdateAdminProgramme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminProgramme> }) =>
      adminProgrammeService.updateProgramme(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('programmes') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('programmes', id) });
    },
  });
};

export const useDeleteAdminProgramme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminProgrammeService.deleteProgramme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('programmes') });
    },
  });
};

// Content Management Hooks - Research Areas
export const useAdminResearchAreas = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('research-areas'),
    queryFn: () => adminResearchAreaService.getResearchAreas(params),
  });
};

export const useAdminResearchAreaById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('research-areas', id),
    queryFn: () => adminResearchAreaService.getResearchAreaById(id),
    enabled: !!id,
  });
};

export const useCreateAdminResearchArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminResearchArea>) => adminResearchAreaService.createResearchArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('research-areas') });
    },
  });
};

export const useUpdateAdminResearchArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminResearchArea> }) =>
      adminResearchAreaService.updateResearchArea(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('research-areas') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('research-areas', id) });
    },
  });
};

export const useDeleteAdminResearchArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminResearchAreaService.deleteResearchArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('research-areas') });
    },
  });
};

// Content Management Hooks - Department Info
export const useAdminDepartmentInfo = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('department-info'),
    queryFn: () => adminDepartmentInfoService.getDepartmentInfo(params),
  });
};

export const useAdminDepartmentInfoById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('department-info', id),
    queryFn: () => adminDepartmentInfoService.getDepartmentInfoById(id),
    enabled: !!id,
  });
};

export const useCreateAdminDepartmentInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminDepartmentInfo>) => adminDepartmentInfoService.createDepartmentInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('department-info') });
    },
  });
};

export const useUpdateAdminDepartmentInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminDepartmentInfo> }) =>
      adminDepartmentInfoService.updateDepartmentInfo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('department-info') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('department-info', id) });
    },
  });
};

export const useDeleteAdminDepartmentInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminDepartmentInfoService.deleteDepartmentInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('department-info') });
    },
  });
};

// Content Management Hooks - Contact Info
export const useAdminContactInfo = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('contact-info'),
    queryFn: () => adminContactInfoService.getContactInfo(params),
  });
};

export const useAdminContactInfoById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('contact-info', id),
    queryFn: () => adminContactInfoService.getContactInfoById(id),
    enabled: !!id,
  });
};

export const useCreateAdminContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminContactInfo>) => adminContactInfoService.createContactInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('contact-info') });
    },
  });
};

export const useUpdateAdminContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminContactInfo> }) =>
      adminContactInfoService.updateContactInfo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('contact-info') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('contact-info', id) });
    },
  });
};

export const useDeleteAdminContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminContactInfoService.deleteContactInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('contact-info') });
    },
  });
};

// Content Management Hooks - Social Media
export const useAdminSocialMedia = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('social-media'),
    queryFn: () => adminSocialMediaService.getSocialMedia(params),
  });
};

export const useAdminSocialMediaById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('social-media', id),
    queryFn: () => adminSocialMediaService.getSocialMediaById(id),
    enabled: !!id,
  });
};

export const useCreateAdminSocialMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminSocialMedia>) => adminSocialMediaService.createSocialMedia(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('social-media') });
    },
  });
};

export const useUpdateAdminSocialMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminSocialMedia> }) =>
      adminSocialMediaService.updateSocialMedia(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('social-media') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('social-media', id) });
    },
  });
};

export const useDeleteAdminSocialMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminSocialMediaService.deleteSocialMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('social-media') });
    },
  });
};

// Content Management Hooks - Milestones
export const useAdminMilestones = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('milestones'),
    queryFn: () => adminMilestoneService.getMilestones(params),
  });
};

export const useAdminMilestoneById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('milestones', id),
    queryFn: () => adminMilestoneService.getMilestoneById(id),
    enabled: !!id,
  });
};

export const useCreateAdminMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminDepartmentMilestone>) => adminMilestoneService.createMilestone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('milestones') });
    },
  });
};

export const useUpdateAdminMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminDepartmentMilestone> }) =>
      adminMilestoneService.updateMilestone(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('milestones') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('milestones', id) });
    },
  });
};

export const useDeleteAdminMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminMilestoneService.deleteMilestone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('milestones') });
    },
  });
};

// Content Management Hooks - Achievements
export const useAdminAchievements = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('achievements'),
    queryFn: () => adminAchievementService.getAchievements(params),
  });
};

export const useAdminAchievementById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('achievements', id),
    queryFn: () => adminAchievementService.getAchievementById(id),
    enabled: !!id,
  });
};

export const useCreateAdminAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminDepartmentAchievement>) => adminAchievementService.createAchievement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('achievements') });
    },
  });
};

export const useUpdateAdminAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminDepartmentAchievement> }) =>
      adminAchievementService.updateAchievement(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('achievements') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('achievements', id) });
    },
  });
};

export const useDeleteAdminAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminAchievementService.deleteAchievement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('achievements') });
    },
  });
};

// Content Management Hooks - Newsletter Subscriptions
export const useAdminNewsletterSubscriptions = (params?: QueryParams) => {
  return useQuery({
    queryKey: adminKeys.content('newsletter'),
    queryFn: () => adminNewsletterService.getNewsletterSubscriptions(params),
  });
};

export const useAdminNewsletterSubscriptionById = (id: number) => {
  return useQuery({
    queryKey: adminKeys.contentItem('newsletter', id),
    queryFn: () => adminNewsletterService.getNewsletterSubscriptionById(id),
    enabled: !!id,
  });
};

export const useCreateAdminNewsletterSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminNewsletterSubscription>) => adminNewsletterService.createNewsletterSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('newsletter') });
    },
  });
};

export const useUpdateAdminNewsletterSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminNewsletterSubscription> }) =>
      adminNewsletterService.updateNewsletterSubscription(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('newsletter') });
      queryClient.invalidateQueries({ queryKey: adminKeys.contentItem('newsletter', id) });
    },
  });
};

export const useDeleteAdminNewsletterSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminNewsletterService.deleteNewsletterSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.content('newsletter') });
    },
  });
};

// Note: The useAdminEvents, useAdminFacilities, useAdminOutreach, useAdminPartners hooks 
// would need to be added to adminService.ts first, then added here
// For now, using placeholder exports that can be implemented later

export const useAdminEvents = () => useQuery({ queryKey: adminKeys.content('events'), queryFn: async () => [] });
export const useAdminFacilities = () => useQuery({ queryKey: adminKeys.content('facilities'), queryFn: async () => [] });
export const useAdminOutreach = () => useQuery({ queryKey: adminKeys.content('outreach'), queryFn: async () => [] });
export const useAdminPartners = () => useQuery({ queryKey: adminKeys.content('partners'), queryFn: async () => [] });


