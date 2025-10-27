import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Eye, Search, Filter, Calendar, Megaphone, 
  Users, Image, Briefcase, GraduationCap, Microscope, Building, 
  Phone, Share2, Award, Newspaper, Globe, Mail, BarChart3
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminContext';
import { useAdminDashboardStats } from '../../hooks/useAdmin';

const MasterAdminManagement: React.FC = () => {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useAdminDashboardStats();
  const [selectedContentType, setSelectedContentType] = useState<string>('overview');

  const contentTypes = [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Dashboard overview and statistics'
    },
    {
      id: 'news',
      name: 'News Articles',
      icon: Newspaper,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Manage news articles and updates',
      count: stats?.news_count || 0,
      href: '/admin/news'
    },
    {
      id: 'announcements',
      name: 'Announcements',
      icon: Megaphone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Manage department announcements',
      count: stats?.announcements_count || 0,
      href: '/admin/announcements'
    },
    {
      id: 'banners',
      name: 'Banners',
      icon: Image,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Manage homepage banners',
      count: stats?.banners_count || 0,
      href: '/admin/banners'
    },
    {
      id: 'team',
      name: 'Team Members',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Manage faculty and staff',
      count: stats?.team_count || 0,
      href: '/admin/team'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Manage research projects',
      count: stats?.projects_count || 0,
      href: '/admin/projects'
    },
    {
      id: 'programmes',
      name: 'Programmes',
      icon: GraduationCap,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Manage academic programmes',
      count: stats?.programmes_count || 0,
      href: '/admin/programmes'
    },
    {
      id: 'research-areas',
      name: 'Research Areas',
      icon: Microscope,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Manage research areas',
      count: stats?.research_areas_count || 0,
      href: '/admin/research-areas'
    },
    {
      id: 'department-info',
      name: 'Department Info',
      icon: Building,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Manage department information',
      count: 1,
      href: '/admin/department-info'
    },
    {
      id: 'contact-info',
      name: 'Contact Info',
      icon: Phone,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Manage contact information',
      count: 1,
      href: '/admin/contact-info'
    },
    {
      id: 'social-media',
      name: 'Social Media',
      icon: Share2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Manage social media links',
      count: stats?.social_media_count || 0,
      href: '/admin/social-media'
    },
    {
      id: 'milestones',
      name: 'Milestones',
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Manage department milestones',
      count: stats?.milestones_count || 0,
      href: '/admin/milestones'
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: Award,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      description: 'Manage department achievements',
      count: stats?.achievements_count || 0,
      href: '/admin/achievements'
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      icon: Mail,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Manage newsletter subscriptions',
      count: stats?.newsletter_subscriptions_count || 0,
      href: '/admin/newsletter'
    }
  ];

  const handleContentTypeClick = (contentType: any) => {
    if (contentType.href) {
      navigate(contentType.href);
    } else {
      setSelectedContentType(contentType.id);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Management Overview</h2>
        <p className="text-gray-600">Welcome to the comprehensive content management system</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(stats || {}).reduce((sum, count) => sum + (count || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mail className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.newsletter_subscriptions_count || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Content Types</p>
              <p className="text-2xl font-bold text-gray-900">{contentTypes.length - 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Management Grid */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Content Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contentTypes.slice(1).map((contentType) => {
            const IconComponent = contentType.icon;
            return (
              <div
                key={contentType.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                onClick={() => handleContentTypeClick(contentType)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 ${contentType.bgColor} rounded-lg`}>
                      <IconComponent className={`h-6 w-6 ${contentType.color}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{contentType.count}</p>
                      <p className="text-xs text-gray-500">items</p>
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {contentType.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {contentType.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleContentTypeClick(contentTypes.find(ct => ct.id === 'news'))}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Newspaper className="h-5 w-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Create News Article</p>
              <p className="text-xs text-gray-500">Add new content</p>
            </div>
          </button>
          
          <button 
            onClick={() => handleContentTypeClick(contentTypes.find(ct => ct.id === 'team'))}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Add Team Member</p>
              <p className="text-xs text-gray-500">Update staff</p>
            </div>
          </button>
          
          <button 
            onClick={() => handleContentTypeClick(contentTypes.find(ct => ct.id === 'banners'))}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Image className="h-5 w-5 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Update Banner</p>
              <p className="text-xs text-gray-500">Change hero image</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Admin Management</h1>
          <p className="text-gray-600">Comprehensive content management system</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            Welcome, {user?.first_name || user?.username}
          </p>
          <p className="text-xs text-gray-500">Admin User</p>
        </div>
      </div>

      {/* Content */}
      {selectedContentType === 'overview' ? renderOverview() : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Content Type Selected</h2>
          <p className="text-gray-600">Redirecting to {selectedContentType} management...</p>
        </div>
      )}
    </div>
  );
};

export default MasterAdminManagement;
