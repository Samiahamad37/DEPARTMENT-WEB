import React from 'react';
import AdminManagement from '../../components/admin/AdminManagement';
import { useAdminProjects, useCreateAdminProject, useUpdateAdminProject, useDeleteAdminProject } from '../../hooks/useAdmin';

const ProjectManagement: React.FC = () => {
  const { data: projects = [], isLoading, error } = useAdminProjects();
  const createMutation = useCreateAdminProject();
  const updateMutation = useUpdateAdminProject();
  const deleteMutation = useDeleteAdminProject();

  const columns = [
    {
      key: 'name',
      label: 'Project',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.description}</div>
        </div>
      )
    },
    {
      key: 'image',
      label: 'Image',
      render: (value: string) => (
        <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden">
          {value ? (
            <img 
              src={value} 
              alt="Project" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      )
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
      key: 'technologies_used',
      label: 'Technologies',
      render: (value: string) => value ? value.substring(0, 30) + '...' : '-'
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
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
    }
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Project Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter project name'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter project description',
      rows: 3
    },
    {
      name: 'detailed_description',
      label: 'Detailed Description',
      type: 'textarea' as const,
      placeholder: 'Enter detailed project description',
      rows: 6
    },
    {
      name: 'image',
      label: 'Project Image',
      type: 'file' as const,
      accept: 'image/*',
      description: 'Upload a project image'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'iot', label: 'Internet of Things' },
        { value: 'embedded', label: 'Embedded Systems' },
        { value: 'web', label: 'Web Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'data_science', label: 'Data Science' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'networking', label: 'Networking' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text' as const,
      placeholder: 'Enter tags separated by commas'
    },
    {
      name: 'contributors',
      label: 'Contributors',
      type: 'textarea' as const,
      placeholder: 'List project contributors',
      rows: 3
    },
    {
      name: 'objectives',
      label: 'Objectives',
      type: 'textarea' as const,
      placeholder: 'Enter project objectives',
      rows: 4
    },
    {
      name: 'outcomes',
      label: 'Outcomes',
      type: 'textarea' as const,
      placeholder: 'Enter project outcomes',
      rows: 4
    },
    {
      name: 'technologies_used',
      label: 'Technologies Used',
      type: 'text' as const,
      placeholder: 'Enter technologies used'
    },
    {
      name: 'project_link',
      label: 'Project Link',
      type: 'url' as const,
      placeholder: 'https://example.com'
    },
    {
      name: 'github_link',
      label: 'GitHub Link',
      type: 'url' as const,
      placeholder: 'https://github.com/username/repo'
    },
    {
      name: 'display_order',
      label: 'Display Order',
      type: 'number' as const,
      min: 0,
      description: 'Lower numbers appear first'
    },
    {
      name: 'is_featured',
      label: 'Featured Project',
      type: 'checkbox' as const
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox' as const
    }
  ];

  const initialFormData = {
    name: '',
    description: '',
    detailed_description: '',
    image: '',
    category: 'other',
    tags: '',
    contributors: '',
    objectives: '',
    outcomes: '',
    technologies_used: '',
    project_link: '',
    github_link: '',
    display_order: 0,
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
      title="Projects"
      data={projects}
      isLoading={isLoading}
      error={error}
      columns={columns}
      formFields={formFields}
      initialFormData={initialFormData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchFields={['name', 'description', 'category', 'technologies_used']}
    />
  );
};

export default ProjectManagement;