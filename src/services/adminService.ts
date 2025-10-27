import api from './api';
import { 
  AdminUser, AdminLoginRequest, AdminLoginResponse, ChangePasswordRequest,
  CreateAdminUserRequest, AdminDashboardStats, AdminNews, AdminBanner,
  AdminTeam, AdminProject, AdminProgramme, AdminResearchArea,
  AdminDepartmentInfo, AdminContactInfo, AdminSocialMedia,
  AdminDepartmentMilestone, AdminDepartmentAchievement,
  AdminNewsletterSubscription, AdminAnnouncement, QueryParams
} from '../types/admin';

// Authentication
export const adminAuthService = {
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const response = await api.post('/admin/login/', credentials);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await api.post('/admin/change-password/', data);
    return response.data;
  },
};

// Admin Users Management
export const adminUserService = {
  getUsers: async (params?: QueryParams): Promise<AdminUser[]> => {
    const response = await api.get('/admin/users/', { params });
    return response.data;
  },

  getUserById: async (id: number): Promise<AdminUser> => {
    const response = await api.get(`/admin/users/${id}/`);
    return response.data;
  },

  createUser: async (data: CreateAdminUserRequest): Promise<AdminUser> => {
    const response = await api.post('/admin/users/', data);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await api.put(`/admin/users/${id}/`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}/`);
  },
};

// Dashboard
export const adminDashboardService = {
  getStats: async (): Promise<AdminDashboardStats> => {
    const response = await api.get('/admin/dashboard/stats/');
    return response.data;
  },
};

// Content Management Services
export const adminNewsService = {
  getNews: async (params?: QueryParams): Promise<AdminNews[]> => {
    const response = await api.get('/admin/content/news/', { params });
    return response.data;
  },

  getNewsById: async (id: number): Promise<AdminNews> => {
    const response = await api.get(`/admin/content/news/${id}/`);
    return response.data;
  },

  createNews: async (data: Partial<AdminNews>): Promise<AdminNews> => {
    const response = await api.post('/admin/content/news/', data);
    return response.data;
  },

  updateNews: async (id: number, data: Partial<AdminNews>): Promise<AdminNews> => {
    const response = await api.put(`/admin/content/news/${id}/`, data);
    return response.data;
  },

  deleteNews: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/news/${id}/`);
  },
};

export const adminBannerService = {
  getBanners: async (params?: QueryParams): Promise<AdminBanner[]> => {
    const response = await api.get('/admin/content/banners/', { params });
    return response.data;
  },

  getBannerById: async (id: number): Promise<AdminBanner> => {
    const response = await api.get(`/admin/content/banners/${id}/`);
    return response.data;
  },

  createBanner: async (data: Partial<AdminBanner>): Promise<AdminBanner> => {
    const response = await api.post('/admin/content/banners/', data);
    return response.data;
  },

  updateBanner: async (id: number, data: Partial<AdminBanner>): Promise<AdminBanner> => {
    const response = await api.put(`/admin/content/banners/${id}/`, data);
    return response.data;
  },

  deleteBanner: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/banners/${id}/`);
  },
};

export const adminTeamService = {
  getTeam: async (params?: QueryParams): Promise<AdminTeam[]> => {
    const response = await api.get('/admin/content/team/', { params });
    return response.data;
  },

  getTeamById: async (id: number): Promise<AdminTeam> => {
    const response = await api.get(`/admin/content/team/${id}/`);
    return response.data;
  },

  createTeamMember: async (data: Partial<AdminTeam>): Promise<AdminTeam> => {
    const response = await api.post('/admin/content/team/', data);
    return response.data;
  },

  updateTeamMember: async (id: number, data: Partial<AdminTeam>): Promise<AdminTeam> => {
    const response = await api.put(`/admin/content/team/${id}/`, data);
    return response.data;
  },

  deleteTeamMember: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/team/${id}/`);
  },
};

export const adminProjectService = {
  getProjects: async (params?: QueryParams): Promise<AdminProject[]> => {
    const response = await api.get('/admin/content/projects/', { params });
    return response.data;
  },

  getProjectById: async (id: number): Promise<AdminProject> => {
    const response = await api.get(`/admin/content/projects/${id}/`);
    return response.data;
  },

  createProject: async (data: Partial<AdminProject>): Promise<AdminProject> => {
    const response = await api.post('/admin/content/projects/', data);
    return response.data;
  },

  updateProject: async (id: number, data: Partial<AdminProject>): Promise<AdminProject> => {
    const response = await api.put(`/admin/content/projects/${id}/`, data);
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/projects/${id}/`);
  },
};

export const adminProgrammeService = {
  getProgrammes: async (params?: QueryParams): Promise<AdminProgramme[]> => {
    const response = await api.get('/admin/content/programmes/', { params });
    return response.data;
  },

  getProgrammeById: async (id: number): Promise<AdminProgramme> => {
    const response = await api.get(`/admin/content/programmes/${id}/`);
    return response.data;
  },

  createProgramme: async (data: Partial<AdminProgramme>): Promise<AdminProgramme> => {
    const response = await api.post('/admin/content/programmes/', data);
    return response.data;
  },

  updateProgramme: async (id: number, data: Partial<AdminProgramme>): Promise<AdminProgramme> => {
    const response = await api.put(`/admin/content/programmes/${id}/`, data);
    return response.data;
  },

  deleteProgramme: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/programmes/${id}/`);
  },
};

export const adminResearchAreaService = {
  getResearchAreas: async (params?: QueryParams): Promise<AdminResearchArea[]> => {
    const response = await api.get('/admin/content/research-areas/', { params });
    return response.data;
  },

  getResearchAreaById: async (id: number): Promise<AdminResearchArea> => {
    const response = await api.get(`/admin/content/research-areas/${id}/`);
    return response.data;
  },

  createResearchArea: async (data: Partial<AdminResearchArea>): Promise<AdminResearchArea> => {
    const response = await api.post('/admin/content/research-areas/', data);
    return response.data;
  },

  updateResearchArea: async (id: number, data: Partial<AdminResearchArea>): Promise<AdminResearchArea> => {
    const response = await api.put(`/admin/content/research-areas/${id}/`, data);
    return response.data;
  },

  deleteResearchArea: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/research-areas/${id}/`);
  },
};

export const adminDepartmentInfoService = {
  getDepartmentInfo: async (params?: QueryParams): Promise<AdminDepartmentInfo[]> => {
    const response = await api.get('/admin/content/department-info/', { params });
    return response.data;
  },

  getDepartmentInfoById: async (id: number): Promise<AdminDepartmentInfo> => {
    const response = await api.get(`/admin/content/department-info/${id}/`);
    return response.data;
  },

  createDepartmentInfo: async (data: Partial<AdminDepartmentInfo>): Promise<AdminDepartmentInfo> => {
    const response = await api.post('/admin/content/department-info/', data);
    return response.data;
  },

  updateDepartmentInfo: async (id: number, data: Partial<AdminDepartmentInfo>): Promise<AdminDepartmentInfo> => {
    const response = await api.put(`/admin/content/department-info/${id}/`, data);
    return response.data;
  },

  deleteDepartmentInfo: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/department-info/${id}/`);
  },
};

export const adminContactInfoService = {
  getContactInfo: async (params?: QueryParams): Promise<AdminContactInfo[]> => {
    const response = await api.get('/admin/content/contact-info/', { params });
    return response.data;
  },

  getContactInfoById: async (id: number): Promise<AdminContactInfo> => {
    const response = await api.get(`/admin/content/contact-info/${id}/`);
    return response.data;
  },

  createContactInfo: async (data: Partial<AdminContactInfo>): Promise<AdminContactInfo> => {
    const response = await api.post('/admin/content/contact-info/', data);
    return response.data;
  },

  updateContactInfo: async (id: number, data: Partial<AdminContactInfo>): Promise<AdminContactInfo> => {
    const response = await api.put(`/admin/content/contact-info/${id}/`, data);
    return response.data;
  },

  deleteContactInfo: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/contact-info/${id}/`);
  },
};

export const adminSocialMediaService = {
  getSocialMedia: async (params?: QueryParams): Promise<AdminSocialMedia[]> => {
    const response = await api.get('/admin/content/social-media/', { params });
    return response.data;
  },

  getSocialMediaById: async (id: number): Promise<AdminSocialMedia> => {
    const response = await api.get(`/admin/content/social-media/${id}/`);
    return response.data;
  },

  createSocialMedia: async (data: Partial<AdminSocialMedia>): Promise<AdminSocialMedia> => {
    const response = await api.post('/admin/content/social-media/', data);
    return response.data;
  },

  updateSocialMedia: async (id: number, data: Partial<AdminSocialMedia>): Promise<AdminSocialMedia> => {
    const response = await api.put(`/admin/content/social-media/${id}/`, data);
    return response.data;
  },

  deleteSocialMedia: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/social-media/${id}/`);
  },
};

export const adminMilestoneService = {
  getMilestones: async (params?: QueryParams): Promise<AdminDepartmentMilestone[]> => {
    const response = await api.get('/admin/content/milestones/', { params });
    return response.data;
  },

  getMilestoneById: async (id: number): Promise<AdminDepartmentMilestone> => {
    const response = await api.get(`/admin/content/milestones/${id}/`);
    return response.data;
  },

  createMilestone: async (data: Partial<AdminDepartmentMilestone>): Promise<AdminDepartmentMilestone> => {
    const response = await api.post('/admin/content/milestones/', data);
    return response.data;
  },

  updateMilestone: async (id: number, data: Partial<AdminDepartmentMilestone>): Promise<AdminDepartmentMilestone> => {
    const response = await api.put(`/admin/content/milestones/${id}/`, data);
    return response.data;
  },

  deleteMilestone: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/milestones/${id}/`);
  },
};

export const adminAchievementService = {
  getAchievements: async (params?: QueryParams): Promise<AdminDepartmentAchievement[]> => {
    const response = await api.get('/admin/content/achievements/', { params });
    return response.data;
  },

  getAchievementById: async (id: number): Promise<AdminDepartmentAchievement> => {
    const response = await api.get(`/admin/content/achievements/${id}/`);
    return response.data;
  },

  createAchievement: async (data: Partial<AdminDepartmentAchievement>): Promise<AdminDepartmentAchievement> => {
    const response = await api.post('/admin/content/achievements/', data);
    return response.data;
  },

  updateAchievement: async (id: number, data: Partial<AdminDepartmentAchievement>): Promise<AdminDepartmentAchievement> => {
    const response = await api.put(`/admin/content/achievements/${id}/`, data);
    return response.data;
  },

  deleteAchievement: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/achievements/${id}/`);
  },
};

export const adminNewsletterService = {
  getNewsletterSubscriptions: async (params?: QueryParams): Promise<AdminNewsletterSubscription[]> => {
    const response = await api.get('/admin/content/newsletter/', { params });
    return response.data;
  },

  getNewsletterSubscriptionById: async (id: number): Promise<AdminNewsletterSubscription> => {
    const response = await api.get(`/admin/content/newsletter/${id}/`);
    return response.data;
  },

  createNewsletterSubscription: async (data: Partial<AdminNewsletterSubscription>): Promise<AdminNewsletterSubscription> => {
    const response = await api.post('/admin/content/newsletter/', data);
    return response.data;
  },

  updateNewsletterSubscription: async (id: number, data: Partial<AdminNewsletterSubscription>): Promise<AdminNewsletterSubscription> => {
    const response = await api.put(`/admin/content/newsletter/${id}/`, data);
    return response.data;
  },

  deleteNewsletterSubscription: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/newsletter/${id}/`);
  },
};

export const adminAnnouncementService = {
  getAnnouncements: async (params?: QueryParams): Promise<AdminAnnouncement[]> => {
    const response = await api.get('/admin/content/announcements/', { params });
    return response.data;
  },

  getAnnouncementById: async (id: number): Promise<AdminAnnouncement> => {
    const response = await api.get(`/admin/content/announcements/${id}/`);
    return response.data;
  },

  createAnnouncement: async (data: Partial<AdminAnnouncement>): Promise<AdminAnnouncement> => {
    const response = await api.post('/admin/content/announcements/', data);
    return response.data;
  },

  updateAnnouncement: async (id: number, data: Partial<AdminAnnouncement>): Promise<AdminAnnouncement> => {
    const response = await api.put(`/admin/content/announcements/${id}/`, data);
    return response.data;
  },

  deleteAnnouncement: async (id: number): Promise<void> => {
    await api.delete(`/admin/content/announcements/${id}/`);
  },
};

