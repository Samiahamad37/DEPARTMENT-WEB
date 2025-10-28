import React, { useState } from 'react';
import { useDepartmentInfo } from '../../hooks/useDepartment';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { departmentInfoSchema, DepartmentInfoFormData } from '../../schemas/adminSchemas';
import { DepartmentInfo } from '../../types/api';

const DepartmentInfoManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<DepartmentInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: departmentInfo, isLoading, createDepartmentInfo, updateDepartmentInfo, deleteDepartmentInfo } = useDepartmentInfo();

  const columns = [
    {
      key: 'name',
      label: 'Department Name',
      sortable: true,
      render: (value: string, item: DepartmentInfo) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500">{item.university}</div>
        </div>
      )
    },
    {
      key: 'head_name',
      label: 'Department Head',
      render: (value: string, item: DepartmentInfo) => (
        <div className="text-sm">
          <div className="text-gray-900">{value || 'Not specified'}</div>
          {item.head_title && (
            <div className="text-gray-500">{item.head_title}</div>
          )}
        </div>
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
    { name: 'name', label: 'Department Name', type: 'text' as const, required: true },
    { name: 'university', label: 'University', type: 'text' as const, required: true },
    { name: 'description', label: 'Department Description', type: 'textarea' as const, rows: 4 },
    { name: 'vision', label: 'Vision', type: 'textarea' as const, rows: 3 },
    { name: 'mission', label: 'Mission', type: 'textarea' as const, rows: 3 },
    { name: 'values', label: 'Values (JSON Array)', type: 'textarea' as const, rows: 3, placeholder: '["Value 1", "Value 2", "Value 3"]' },
    { name: 'head_message', label: "Head's Message", type: 'textarea' as const, rows: 4 },
    { name: 'head_name', label: "Head's Name", type: 'text' as const },
    { name: 'head_title', label: "Head's Title", type: 'text' as const },
    { name: 'head_photo', label: "Head's Photo", type: 'file' as const, accept: 'image/*' },
    { name: 'logo', label: 'Department Logo', type: 'file' as const, accept: 'image/*' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingInfo(null);
    setIsFormOpen(true);
  };

  const handleEdit = (info: DepartmentInfo) => {
    setEditingInfo(info);
    setIsFormOpen(true);
  };

  const handleDelete = async (info: DepartmentInfo) => {
    if (window.confirm('Are you sure you want to delete this department information?')) {
      try {
        await deleteDepartmentInfo.mutateAsync(info.id);
      } catch (error) {
        console.error('Failed to delete department info:', error);
      }
    }
  };

  const handleFormSubmit = async (data: DepartmentInfoFormData) => {
    try {
      if (editingInfo) {
        await updateDepartmentInfo.mutateAsync({ id: editingInfo.id, data });
      } else {
        await createDepartmentInfo.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingInfo(null);
    } catch (error) {
      console.error('Failed to save department info:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingInfo(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Department Information</h1>
        <div className="text-sm text-gray-500">
          Manage department details, vision, mission, and leadership
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingInfo ? 'Edit Department Information' : 'Create Department Information'}
          schema={departmentInfoSchema}
          fields={formFields}
          defaultValues={editingInfo}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createDepartmentInfo.isPending || updateDepartmentInfo.isPending}
        />
      ) : (
        <AdminDataTable
          title="Department Information"
          columns={columns}
          data={departmentInfo || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No department information found"
          searchPlaceholder="Search department info..."
        />
      )}
    </div>
  );
};

export default DepartmentInfoManagement;



