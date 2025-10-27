// Admin API Types
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  must_change_password: boolean;
  last_password_change: string | null;
  created_at: string;
  is_active: boolean;
  date_joined: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  user: AdminUser;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface CreateAdminUserRequest {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password?: string;
}

export interface AdminDashboardStats {
  news_count: number;
  announcements_count: number;
  banners_count: number;
  team_count: number;
  projects_count: number;
  programmes_count: number;
  research_areas_count: number;
  newsletter_subscriptions_count: number;
}

// Content Management Types (extended from existing types)
export interface AdminNews extends News {
  // Inherits all News fields
}

export interface AdminBanner extends Banner {
  // Inherits all Banner fields
}

export interface AdminTeam extends Team {
  // Inherits all Team fields
}

export interface AdminProject extends Project {
  // Inherits all Project fields
}

export interface AdminProgramme extends Programme {
  // Inherits all Programme fields
}

export interface AdminResearchArea extends ResearchArea {
  // Inherits all ResearchArea fields
}

export interface AdminDepartmentInfo extends DepartmentInfo {
  // Inherits all DepartmentInfo fields
}

export interface AdminContactInfo extends ContactInfo {
  // Inherits all ContactInfo fields
}

export interface AdminSocialMedia extends SocialMedia {
  // Inherits all SocialMedia fields
}

export interface AdminDepartmentMilestone extends DepartmentMilestone {
  // Inherits all DepartmentMilestone fields
}

export interface AdminDepartmentAchievement extends DepartmentAchievement {
  // Inherits all DepartmentAchievement fields
}

export interface AdminNewsletterSubscription extends NewsletterSubscription {
  // Inherits all NewsletterSubscription fields
}

export interface AdminAnnouncement extends Announcement {
  // Inherits all Announcement fields
}

// Import existing types
import { 
  News, Banner, Team, Project, Programme, ResearchArea,
  DepartmentInfo, ContactInfo, SocialMedia, DepartmentMilestone,
  DepartmentAchievement, Announcement, NewsletterSubscription
} from './api';

