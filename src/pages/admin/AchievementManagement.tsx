import React, { useState } from 'react';
import { useAchievements } from '../../hooks/useAchievements';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { departmentAchievementSchema, DepartmentAchievementFormData } from '../../schemas/adminSchemas';
import { DepartmentAchievement } from '../../types/api';

const AchievementManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<DepartmentAchievement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: achievements, isLoading, createAchievement, updateAchievement, deleteAchievement } = useAchievements();

  const columns = [
    {
      key: 'number',
      label: 'Achievement',
      sortable: true,
      render: (value: string, item: DepartmentAchievement) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 text-lg">{value}</div>
          <div className="text-sm text-gray-500">{item.label}</div>
        </div>
      )
    },
    {
      key: 'label',
      label: 'Label',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value}</span>
      )
    },
    {
      key: 'icon_name',
      label: 'Icon',
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {value}
        </span>
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
    { name: 'icon_name', label: 'Icon Name', type: 'text' as const, required: true, placeholder: 'e.g., users, graduation-cap, award' },
    { name: 'number', label: 'Number/Value', type: 'text' as const, required: true, placeholder: 'e.g., 500+, 95%, 50' },
    { name: 'label', label: 'Label', type: 'text' as const, required: true, placeholder: 'e.g., Students, Success Rate, Projects' },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
    { name: 'display_order', label: 'Display Order', type: 'number' as const, placeholder: '0' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingAchievement(null);
    setIsFormOpen(true);
  };

  const handleEdit = (achievement: DepartmentAchievement) => {
    setEditingAchievement(achievement);
    setIsFormOpen(true);
  };

  const handleDelete = async (achievement: DepartmentAchievement) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement.mutateAsync(achievement.id);
      } catch (error) {
        console.error('Failed to delete achievement:', error);
      }
    }
  };

  const handleFormSubmit = async (data: DepartmentAchievementFormData) => {
    try {
      if (editingAchievement) {
        await updateAchievement.mutateAsync({ id: editingAchievement.id, data });
      } else {
        await createAchievement.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingAchievement(null);
    } catch (error) {
      console.error('Failed to save achievement:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAchievement(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Achievement Management</h1>
        <div className="text-sm text-gray-500">
          Manage department achievements and statistics
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingAchievement ? 'Edit Achievement' : 'Create Achievement'}
          schema={departmentAchievementSchema}
          fields={formFields}
          defaultValues={editingAchievement}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createAchievement.isPending || updateAchievement.isPending}
        />
      ) : (
        <AdminDataTable
          title="Department Achievements"
          columns={columns}
          data={achievements || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No achievements found"
          searchPlaceholder="Search achievements..."
        />
      )}
    </div>
  );
};

export default AchievementManagement;



