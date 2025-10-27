import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import AdminDataTable from './AdminDataTable';
import AdminForm from './AdminForm';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'file' | 'url' | 'number' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  description?: string;
  accept?: string;
  min?: number;
  max?: number;
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminManagementProps {
  title: string;
  data: any[];
  isLoading?: boolean;
  error?: any;
  columns: Column[];
  formFields: FormField[];
  initialFormData: any;
  onCreate: (data: any) => Promise<any>;
  onUpdate: (id: number, data: any) => Promise<any>;
  onDelete: (id: number) => Promise<void>;
  searchFields?: string[];
}

const AdminManagement: React.FC<AdminManagementProps> = ({
  title,
  data,
  isLoading = false,
  error,
  columns,
  formFields,
  initialFormData,
  onCreate,
  onUpdate,
  onDelete,
  searchFields = []
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });

    setFilteredData(filtered);
  }, [data, searchQuery, searchFields]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await onUpdate(editingItem.id, formData);
      } else {
        await onCreate(formData);
      }
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to save item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  if (error) {
    return (
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">
            {error.message || 'An error occurred while loading the data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <AdminForm
        title={editingItem ? `Edit ${title}` : `Create ${title}`}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isLoading={isSubmitting}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">Manage your {title.toLowerCase()}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <AdminDataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={`No ${title.toLowerCase()} found${searchQuery ? ' matching your search' : ''}`}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="text-blue-600 text-xl">📊</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{data.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="text-green-600 text-xl">✅</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.filter(item => item.is_active !== false).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <div className="text-orange-600 text-xl">⭐</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.filter(item => item.is_featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;