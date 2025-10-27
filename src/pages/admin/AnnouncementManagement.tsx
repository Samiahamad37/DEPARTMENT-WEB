import React from 'react';
import AdminManagement from '../../components/admin/AdminManagement';
import { useAdminAnnouncements, useCreateAdminAnnouncement, useUpdateAdminAnnouncement, useDeleteAdminAnnouncement } from '../../hooks/useAdmin';

const AnnouncementManagement: React.FC = () => {
  const { data: announcements = [], isLoading, error } = useAdminAnnouncements();
  const createMutation = useCreateAdminAnnouncement();
  const updateMutation = useUpdateAdminAnnouncement();
  const deleteMutation = useDeleteAdminAnnouncement();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.content?.substring(0, 100)}...</div>
        </div>
      )
    },
    {
      key: 'date_posted',
      label: 'Date Posted',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'is_featured',
      label: 'Featured',
      render: (value: boolean) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: 'is_active',
      label: 'Active',
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
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter announcement title'
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter announcement content',
      rows: 8
    },
    {
      name: 'is_featured',
      label: 'Featured Announcement',
      type: 'checkbox' as const
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox' as const
    }
  ];

  const initialFormData = {
    title: '',
    content: '',
    is_featured: false,
    is_active: true
  };

  const handleCreate = async (data: any) => {
    return await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (id: number, data: any) => {
    return await updateMutation.mutateAsync({ id, data });
  };

  const handleDelete = async (id: number) => {
    return await deleteMutation.mutateAsync(id);
  };

  return (
    <AdminManagement
      title="Announcements"
      data={announcements}
      isLoading={isLoading}
      error={error}
      columns={columns}
      formFields={formFields}
      initialFormData={initialFormData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchFields={['title', 'content']}
    />
  );
};

export default AnnouncementManagement;