import React from 'react';
import AdminManagement from '../../components/admin/AdminManagement';
import { useAdminTeam, useCreateAdminTeamMember, useUpdateAdminTeamMember, useDeleteAdminTeamMember } from '../../hooks/useAdmin';

const TeamManagement: React.FC = () => {
  const { data: team = [], isLoading, error } = useAdminTeam();
  const createMutation = useCreateAdminTeamMember();
  const updateMutation = useUpdateAdminTeamMember();
  const deleteMutation = useDeleteAdminTeamMember();

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
            {item.photo ? (
              <img 
                src={item.photo} 
                alt={value} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                {value.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{item.get_role_display || item.role}</div>
          </div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (value: string) => value || '-'
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => value || '-'
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: string) => value || '-'
    },
    {
      key: 'office_location',
      label: 'Office',
      render: (value: string) => value || '-'
    },
    {
      key: 'display_order',
      label: 'Order',
      sortable: true
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
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'head', label: 'Head of Department' },
        { value: 'professor', label: 'Professor' },
        { value: 'associate_professor', label: 'Associate Professor' },
        { value: 'senior_lecturer', label: 'Senior Lecturer' },
        { value: 'lecturer', label: 'Lecturer' },
        { value: 'assistant_lecturer', label: 'Assistant Lecturer' },
        { value: 'tutorial_assistant', label: 'Tutorial Assistant' },
        { value: 'admin', label: 'Administrative Staff' },
        { value: 'technical', label: 'Technical Staff' }
      ]
    },
    {
      name: 'title',
      label: 'Official Title',
      type: 'text' as const,
      placeholder: 'e.g., Professor of Computer Science'
    },
    {
      name: 'specialization',
      label: 'Specialization',
      type: 'text' as const,
      placeholder: 'Enter specialization area'
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea' as const,
      placeholder: 'Enter biography',
      rows: 4
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'file' as const,
      accept: 'image/*',
      description: 'Upload a profile photo'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      placeholder: 'Enter email address'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text' as const,
      placeholder: 'Enter phone number'
    },
    {
      name: 'office_location',
      label: 'Office Location',
      type: 'text' as const,
      placeholder: 'Enter office location'
    },
    {
      name: 'education',
      label: 'Education',
      type: 'textarea' as const,
      placeholder: 'Enter educational background (one per line)',
      rows: 3
    },
    {
      name: 'research_areas',
      label: 'Research Areas',
      type: 'textarea' as const,
      placeholder: 'Enter research areas (one per line)',
      rows: 3
    },
    {
      name: 'publications_count',
      label: 'Publications Count',
      type: 'number' as const,
      min: 0,
      description: 'Number of publications'
    },
    {
      name: 'awards',
      label: 'Awards',
      type: 'textarea' as const,
      placeholder: 'Enter awards and recognitions (one per line)',
      rows: 3
    },
    {
      name: 'display_order',
      label: 'Display Order',
      type: 'number' as const,
      min: 0,
      description: 'Lower numbers appear first'
    },
    {
      name: 'is_on_study_leave',
      label: 'On Study Leave',
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
    role: 'lecturer',
    title: '',
    specialization: '',
    bio: '',
    photo: '',
    email: '',
    phone: '',
    office_location: '',
    education: '',
    research_areas: '',
    publications_count: 0,
    awards: '',
    display_order: 0,
    is_on_study_leave: false,
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
      title="Team Members"
      data={team}
      isLoading={isLoading}
      error={error}
      columns={columns}
      formFields={formFields}
      initialFormData={initialFormData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchFields={['name', 'specialization', 'email', 'role']}
    />
  );
};

export default TeamManagement;