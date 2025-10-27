// API Response Types
export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  show_highlights: boolean;
  highlight_1_text: string;
  highlight_2_text: string;
  highlight_3_text: string;
  overlay_opacity: number;
}

export interface Team {
  id: number;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  office_location: string;
  is_active: boolean;
  is_on_study_leave: boolean;
  display_order: number;
  title?: string;
  education?: string;
  research_areas?: string;
  publications_count?: number;
  awards?: string;
  get_role_display?: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date_posted: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  detailed_description: string;
  image: string;
  category: string;
  tags: string;
  tag_list: string[];
  contributors: string;
  objectives: string;
  outcomes: string;
  technologies_used: string;
  project_link: string;
  github_link: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  display_order: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  status: string;
  location: string;
  is_featured: boolean;
}

export interface News {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date_posted: string;
  is_featured: boolean;
  is_active: boolean;
  tags: string;
  tag_list: string[];
  status: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website_url: string;
  partnership_type: string;
  is_active: boolean;
  display_order: number;
}

export interface Programme {
  id: number;
  title: string;
  degree_type: string;
  description: string;
  detailed_description: string;
  duration: string;
  requirements: string;
  career_prospects: string;
  image: string;
  is_active: boolean;
  display_order: number;
}

export interface ResearchArea {
  id: number;
  name: string;
  description: string;
  image: string;
  key_faculty: Team[];
  is_active: boolean;
  display_order: number;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
  equipment_list: string;
  capacity: string;
  location: string;
  is_active: boolean;
  display_order: number;
}

export interface OutreachInitiative {
  id: number;
  title: string;
  description: string;
  image: string;
  impact_description: string;
  target_audience: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  display_order: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date_sent: string;
  is_read: boolean;
}

export interface DepartmentInfo {
  id: number;
  name: string;
  university: string;
  description: string;
  vision: string;
  mission: string;
  values: string;
  values_list: string[];
  head_message: string;
  head_name: string;
  head_title: string;
  head_photo: string;
  logo: string;
  is_active: boolean;
}

export interface ContactInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
  office_hours: string;
  is_active: boolean;
}

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  is_active: boolean;
  display_order: number;
}

export interface DepartmentMilestone {
  id: number;
  year: string;
  title: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export interface DepartmentAchievement {
  id: number;
  icon_name: string;
  number: string;
  label: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

// API Response wrapper
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Query parameters for pagination and filtering
export interface QueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  is_featured?: boolean;
  is_active?: boolean;
}


