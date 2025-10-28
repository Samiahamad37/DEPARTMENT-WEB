import * as yup from 'yup';

// News Schema
export const newsSchema = yup.object({
  title: yup.string().required('Title is required').max(200, 'Title must be less than 200 characters'),
  description: yup.string().required('Description is required'),
  image: yup.mixed().required('Image is required'),
  category: yup.string().required('Category is required').oneOf([
    'event', 'research', 'student_achievement', 
    'faculty_news', 'department_news', 'general'
  ]),
  author: yup.string().max(100, 'Author name must be less than 100 characters'),
  is_featured: yup.boolean(),
  is_active: yup.boolean(),
  tags: yup.string().max(200, 'Tags must be less than 200 characters'),
});

// Banner Schema
export const bannerSchema = yup.object({
  title: yup.string().required('Title is required').max(200, 'Title must be less than 200 characters'),
  subtitle: yup.string().max(300, 'Subtitle must be less than 300 characters'),
  description: yup.string(),
  background_image: yup.mixed().required('Background image is required'),
  cta_text: yup.string().max(100, 'CTA text must be less than 100 characters'),
  cta_link: yup.string().url('Must be a valid URL'),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Team Schema
export const teamSchema = yup.object({
  name: yup.string().required('Name is required').max(100, 'Name must be less than 100 characters'),
  role: yup.string().required('Role is required').oneOf([
    'head', 'lecturer', 'assistant_lecturer', 'admin', 'technical'
  ]),
  specialization: yup.string().max(200, 'Specialization must be less than 200 characters'),
  bio: yup.string(),
  photo: yup.mixed(),
  email: yup.string().email('Must be a valid email'),
  phone: yup.string().max(20, 'Phone must be less than 20 characters'),
  office_location: yup.string().max(100, 'Office location must be less than 100 characters'),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Project Schema
export const projectSchema = yup.object({
  name: yup.string().required('Project name is required').max(200, 'Name must be less than 200 characters'),
  description: yup.string().required('Description is required'),
  detailed_description: yup.string(),
  image: yup.mixed(),
  category: yup.string().required('Category is required').oneOf([
    'ai', 'iot', 'embedded', 'web', 'mobile', 'data_science', 
    'cybersecurity', 'networking', 'other'
  ]),
  tags: yup.string().max(200, 'Tags must be less than 200 characters'),
  contributors: yup.string(),
  objectives: yup.string(),
  outcomes: yup.string(),
  technologies_used: yup.string().max(300, 'Technologies must be less than 300 characters'),
  project_link: yup.string().url('Must be a valid URL'),
  github_link: yup.string().url('Must be a valid URL'),
  is_featured: yup.boolean(),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Programme Schema
export const programmeSchema = yup.object({
  title: yup.string().required('Programme title is required').max(200, 'Title must be less than 200 characters'),
  degree_type: yup.string().required('Degree type is required').oneOf([
    'certificate', 'diploma', 'bachelor', 'master', 'phd'
  ]),
  description: yup.string().required('Description is required'),
  detailed_description: yup.string(),
  duration: yup.string().max(50, 'Duration must be less than 50 characters'),
  requirements: yup.string(),
  career_prospects: yup.string(),
  image: yup.mixed(),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Research Area Schema
export const researchAreaSchema = yup.object({
  name: yup.string().required('Research area name is required').max(200, 'Name must be less than 200 characters'),
  description: yup.string().required('Description is required'),
  image: yup.mixed(),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Department Info Schema
export const departmentInfoSchema = yup.object({
  name: yup.string().required('Department name is required').max(200, 'Name must be less than 200 characters'),
  university: yup.string().required('University name is required').max(200, 'University must be less than 200 characters'),
  description: yup.string(),
  vision: yup.string(),
  mission: yup.string(),
  values: yup.string(),
  head_message: yup.string(),
  head_name: yup.string().max(100, 'Head name must be less than 100 characters'),
  head_title: yup.string().max(100, 'Head title must be less than 100 characters'),
  head_photo: yup.mixed(),
  logo: yup.mixed(),
  is_active: yup.boolean(),
});

// Contact Info Schema
export const contactInfoSchema = yup.object({
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required').max(50, 'Phone must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  office_hours: yup.string().max(100, 'Office hours must be less than 100 characters'),
  is_active: yup.boolean(),
});

// Social Media Schema
export const socialMediaSchema = yup.object({
  platform: yup.string().required('Platform is required').oneOf([
    'facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'website'
  ]),
  url: yup.string().required('URL is required').url('Must be a valid URL'),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Department Milestone Schema
export const departmentMilestoneSchema = yup.object({
  year: yup.string().required('Year is required').max(10, 'Year must be less than 10 characters'),
  title: yup.string().required('Title is required').max(200, 'Title must be less than 200 characters'),
  description: yup.string().required('Description is required'),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Department Achievement Schema
export const departmentAchievementSchema = yup.object({
  icon_name: yup.string().required('Icon name is required').max(50, 'Icon name must be less than 50 characters'),
  number: yup.string().required('Number is required').max(20, 'Number must be less than 20 characters'),
  label: yup.string().required('Label is required').max(100, 'Label must be less than 100 characters'),
  description: yup.string().required('Description is required'),
  is_active: yup.boolean(),
  display_order: yup.number().min(0, 'Display order must be 0 or greater'),
});

// Newsletter Subscription Schema
export const newsletterSubscriptionSchema = yup.object({
  email: yup.string().required('Email is required').email('Must be a valid email'),
  is_active: yup.boolean(),
});

// Admin User Schema
export const adminUserSchema = yup.object({
  username: yup.string().required('Username is required').max(150, 'Username must be less than 150 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  first_name: yup.string().max(30, 'First name must be less than 30 characters'),
  last_name: yup.string().max(150, 'Last name must be less than 150 characters'),
  password: yup.string().min(8, 'Password must be at least 8 characters'),
});

// Change Password Schema
export const changePasswordSchema = yup.object({
  current_password: yup.string().required('Current password is required'),
  new_password: yup.string().required('New password is required').min(8, 'Password must be at least 8 characters'),
  confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('new_password')], 'Passwords must match'),
});

export type NewsFormData = yup.InferType<typeof newsSchema>;
export type BannerFormData = yup.InferType<typeof bannerSchema>;
export type TeamFormData = yup.InferType<typeof teamSchema>;
export type ProjectFormData = yup.InferType<typeof projectSchema>;
export type ProgrammeFormData = yup.InferType<typeof programmeSchema>;
export type ResearchAreaFormData = yup.InferType<typeof researchAreaSchema>;
export type DepartmentInfoFormData = yup.InferType<typeof departmentInfoSchema>;
export type ContactInfoFormData = yup.InferType<typeof contactInfoSchema>;
export type SocialMediaFormData = yup.InferType<typeof socialMediaSchema>;
export type DepartmentMilestoneFormData = yup.InferType<typeof departmentMilestoneSchema>;
export type DepartmentAchievementFormData = yup.InferType<typeof departmentAchievementSchema>;
export type NewsletterSubscriptionFormData = yup.InferType<typeof newsletterSubscriptionSchema>;
export type AdminUserFormData = yup.InferType<typeof adminUserSchema>;
export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;

