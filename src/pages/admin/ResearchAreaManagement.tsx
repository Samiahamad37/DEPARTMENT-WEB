import React, { useState } from 'react';
import { useResearchAreas } from '../../hooks/useResearchAreas';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { researchAreaSchema, ResearchAreaFormData } from '../../schemas/adminSchemas';
import { ResearchArea } from '../../types/api';

const ResearchAreaManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<ResearchArea | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: researchAreas, isLoading, createResearchArea, updateResearchArea, deleteResearchArea } = useResearchAreas();

  const columns = [
    {
      key: 'name',
      label: 'Research Area',
      sortable: true,
      render: (value: string, item: ResearchArea) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.description}</div>
        </div>
      )
    },
    {
      key: 'key_faculty',
      label: 'Key Faculty',
      render: (value: any[], item: ResearchArea) => (
        <div className="max-w-xs">
          {value && value.length > 0 ? (
            <div className="text-sm text-gray-900">
              {value.map((faculty: any, index: number) => (
                <span key={faculty.id || index}>
                  {faculty.name}
                  {index < value.length - 1 && ', '}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">No faculty assigned</span>
          )}
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
    { name: 'name', label: 'Research Area Name', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 4 },
    { name: 'image', label: 'Research Area Image', type: 'file' as const, accept: 'image/*' },
    { name: 'display_order', label: 'Display Order', type: 'number' as const, placeholder: '0' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingArea(null);
    setIsFormOpen(true);
  };

  const handleEdit = (area: ResearchArea) => {
    setEditingArea(area);
    setIsFormOpen(true);
  };

  const handleDelete = async (area: ResearchArea) => {
    if (window.confirm('Are you sure you want to delete this research area?')) {
      try {
        await deleteResearchArea.mutateAsync(area.id);
      } catch (error) {
        console.error('Failed to delete research area:', error);
      }
    }
  };

  const handleFormSubmit = async (data: ResearchAreaFormData) => {
    try {
      if (editingArea) {
        await updateResearchArea.mutateAsync({ id: editingArea.id, data });
      } else {
        await createResearchArea.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingArea(null);
    } catch (error) {
      console.error('Failed to save research area:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingArea(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Research Area Management</h1>
        <div className="text-sm text-gray-500">
          Manage research areas and faculty assignments
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingArea ? 'Edit Research Area' : 'Create Research Area'}
          schema={researchAreaSchema}
          fields={formFields}
          defaultValues={editingArea}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createResearchArea.isPending || updateResearchArea.isPending}
        />
      ) : (
        <AdminDataTable
          title="Research Areas"
          columns={columns}
          data={researchAreas || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No research areas found"
          searchPlaceholder="Search research areas..."
        />
      )}
    </div>
  );
};

export default ResearchAreaManagement;

