import React, { useState } from 'react';
import { useProgrammes } from '../../hooks/useProgrammes';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { programmeSchema, ProgrammeFormData } from '../../schemas/adminSchemas';
import { Programme } from '../../types/api';

const ProgrammeManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: programmes, isLoading, createProgramme, updateProgramme, deleteProgramme } = useProgrammes();

  const columns = [
    {
      key: 'title',
      label: 'Programme Title',
      sortable: true,
      render: (value: string, item: Programme) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500">{item.degree_type.replace('_', ' ').toUpperCase()}</div>
        </div>
      )
    },
    {
      key: 'degree_type',
      label: 'Degree Type',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value.replace('_', ' ').toUpperCase()}
        </span>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value || 'Not specified'}</span>
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
    { name: 'title', label: 'Programme Title', type: 'text' as const, required: true },
    { 
      name: 'degree_type', 
      label: 'Degree Type', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'certificate', label: 'Certificate' },
        { value: 'diploma', label: 'Diploma' },
        { value: 'bachelor', label: 'Bachelor' },
        { value: 'master', label: 'Master' },
        { value: 'phd', label: 'PhD' }
      ]
    },
    { name: 'description', label: 'Short Description', type: 'textarea' as const, required: true, rows: 3 },
    { name: 'detailed_description', label: 'Detailed Description', type: 'textarea' as const, rows: 6 },
    { name: 'duration', label: 'Duration', type: 'text' as const, placeholder: 'e.g., 4 years, 2 semesters' },
    { name: 'requirements', label: 'Entry Requirements', type: 'textarea' as const, rows: 4 },
    { name: 'career_prospects', label: 'Career Prospects', type: 'textarea' as const, rows: 4 },
    { name: 'image', label: 'Programme Image', type: 'file' as const, accept: 'image/*' },
    { name: 'display_order', label: 'Display Order', type: 'number' as const, placeholder: '0' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingProgramme(null);
    setIsFormOpen(true);
  };

  const handleEdit = (programme: Programme) => {
    setEditingProgramme(programme);
    setIsFormOpen(true);
  };

  const handleDelete = async (programme: Programme) => {
    if (window.confirm('Are you sure you want to delete this programme?')) {
      try {
        await deleteProgramme.mutateAsync(programme.id);
      } catch (error) {
        console.error('Failed to delete programme:', error);
      }
    }
  };

  const handleFormSubmit = async (data: ProgrammeFormData) => {
    try {
      if (editingProgramme) {
        await updateProgramme.mutateAsync({ id: editingProgramme.id, data });
      } else {
        await createProgramme.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingProgramme(null);
    } catch (error) {
      console.error('Failed to save programme:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProgramme(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Programme Management</h1>
        <div className="text-sm text-gray-500">
          Manage academic programmes and courses
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingProgramme ? 'Edit Programme' : 'Create Programme'}
          schema={programmeSchema}
          fields={formFields}
          defaultValues={editingProgramme}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createProgramme.isPending || updateProgramme.isPending}
        />
      ) : (
        <AdminDataTable
          title="Academic Programmes"
          columns={columns}
          data={programmes || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No programmes found"
          searchPlaceholder="Search programmes..."
        />
      )}
    </div>
  );
};

export default ProgrammeManagement;

