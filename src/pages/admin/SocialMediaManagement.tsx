import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { useSocialMedia } from '../../hooks/useSocialMedia';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { socialMediaSchema, SocialMediaFormData } from '../../schemas/adminSchemas';
import { SocialMedia } from '../../types/api';

const SocialMediaManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: socialMedia, isLoading, createSocialMedia, updateSocialMedia, deleteSocialMedia } = useSocialMedia();

  const columns = [
    {
      key: 'platform',
      label: 'Platform',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value.toUpperCase()}
        </span>
      )
    },
    {
      key: 'url',
      label: 'URL',
      render: (value: string) => (
        <div className="max-w-xs">
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 truncate block"
          >
            {value}
          </a>
        </div>
      )
    },
    {
      key: 'display_order',
      label: 'Order',
      sortable: true,
      render: (value: number) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {value}
        </span>
      )
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const formFields = [
    { 
      name: 'platform', 
      label: 'Platform', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'facebook', label: 'Facebook' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'website', label: 'Website' }
      ]
    },
    { name: 'url', label: 'URL', type: 'url' as const, required: true },
    { name: 'display_order', label: 'Display Order', type: 'number' as const, placeholder: '0' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingSocial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (social: SocialMedia) => {
    setEditingSocial(social);
    setIsFormOpen(true);
  };

  const handleDelete = async (social: SocialMedia) => {
    if (window.confirm('Are you sure you want to delete this social media link?')) {
      try {
        await deleteSocialMedia.mutateAsync(social.id);
      } catch (error) {
        console.error('Failed to delete social media:', error);
      }
    }
  };

  const handleFormSubmit = async (data: SocialMediaFormData) => {
    try {
      if (editingSocial) {
        await updateSocialMedia.mutateAsync({ id: editingSocial.id, data });
      } else {
        await createSocialMedia.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingSocial(null);
    } catch (error) {
      console.error('Failed to save social media:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingSocial(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Social Media Management"
        description="Manage social media links and platform connections for your department"
        icon={Share2}
      />

      {isFormOpen ? (
        <AdminForm
          title={editingSocial ? 'Edit Social Media Link' : 'Create Social Media Link'}
          schema={socialMediaSchema}
          fields={formFields}
          defaultValues={editingSocial}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createSocialMedia.isPending || updateSocialMedia.isPending}
        />
      ) : (
        <AdminDataTable
          title="Social Media Links"
          columns={columns}
          data={socialMedia || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          searchTerm={searchQuery}
          isLoading={isLoading}
          emptyMessage="No social media links found"
          searchPlaceholder="Search social media..."
        />
      )}
    </div>
  );
};

export default SocialMediaManagement;

