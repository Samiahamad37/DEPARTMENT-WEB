import React from 'react';
import AdminManagement from '../../components/admin/AdminManagement';
import { useAdminNews, useCreateAdminNews, useUpdateAdminNews, useDeleteAdminNews } from '../../hooks/useAdmin';

const NewsManagement: React.FC = () => {
  const { data: news = [], isLoading, error } = useAdminNews();
  const createMutation = useCreateAdminNews();
  const updateMutation = useUpdateAdminNews();
  const deleteMutation = useDeleteAdminNews();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.description}</div>
        </div>
      )
    },
    {
      key: 'author',
      label: 'Author',
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
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
    },
    {
      key: 'date_posted',
      label: 'Date Posted',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter news title'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter news description',
      rows: 3
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter full news content',
      rows: 8
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'url' as const,
      placeholder: 'https://example.com/image.jpg'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'announcement', label: 'Announcement' },
        { value: 'event', label: 'Event' },
        { value: 'research', label: 'Research' },
        { value: 'student_achievement', label: 'Student Achievement' },
        { value: 'faculty_news', label: 'Faculty News' },
        { value: 'department_news', label: 'Department News' },
        { value: 'general', label: 'General' }
      ]
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter author name'
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text' as const,
      placeholder: 'Enter tags separated by commas'
    },
    {
      name: 'is_featured',
      label: 'Featured News',
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
    description: '',
    content: '',
    image: '',
    category: 'general',
    author: '',
    tags: '',
    is_featured: false,
    is_active: true,
    status: 'published'
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
      title="News Articles"
      data={news}
      isLoading={isLoading}
      error={error}
      columns={columns}
      formFields={formFields}
      initialFormData={initialFormData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchFields={['title', 'author', 'category', 'description']}
    />
  );
};

export default NewsManagement;