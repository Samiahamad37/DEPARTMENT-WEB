import React, { useState } from 'react';
import { useMilestones } from '../../hooks/useMilestones';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { departmentMilestoneSchema, DepartmentMilestoneFormData } from '../../schemas/adminSchemas';
import { DepartmentMilestone } from '../../types/api';

const MilestoneManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<DepartmentMilestone | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: milestones, isLoading, createMilestone, updateMilestone, deleteMilestone } = useMilestones();

  const columns = [
    {
      key: 'year',
      label: 'Year',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'title',
      label: 'Milestone',
      sortable: true,
      render: (value: string, item: DepartmentMilestone) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.description}</div>
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
    { name: 'year', label: 'Year', type: 'text' as const, required: true, placeholder: 'e.g., 2020' },
    { name: 'title', label: 'Milestone Title', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 4 },
    { name: 'display_order', label: 'Display Order', type: 'number' as const, placeholder: '0' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingMilestone(null);
    setIsFormOpen(true);
  };

  const handleEdit = (milestone: DepartmentMilestone) => {
    setEditingMilestone(milestone);
    setIsFormOpen(true);
  };

  const handleDelete = async (milestone: DepartmentMilestone) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        await deleteMilestone.mutateAsync(milestone.id);
      } catch (error) {
        console.error('Failed to delete milestone:', error);
      }
    }
  };

  const handleFormSubmit = async (data: DepartmentMilestoneFormData) => {
    try {
      if (editingMilestone) {
        await updateMilestone.mutateAsync({ id: editingMilestone.id, data });
      } else {
        await createMilestone.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingMilestone(null);
    } catch (error) {
      console.error('Failed to save milestone:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingMilestone(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Milestone Management</h1>
        <div className="text-sm text-gray-500">
          Manage department milestones and historical achievements
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingMilestone ? 'Edit Milestone' : 'Create Milestone'}
          schema={departmentMilestoneSchema}
          fields={formFields}
          defaultValues={editingMilestone}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createMilestone.isPending || updateMilestone.isPending}
        />
      ) : (
        <AdminDataTable
          title="Department Milestones"
          columns={columns}
          data={milestones || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No milestones found"
          searchPlaceholder="Search milestones..."
        />
      )}
    </div>
  );
};

export default MilestoneManagement;



