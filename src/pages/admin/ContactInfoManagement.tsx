import React, { useState } from 'react';
import { useContactInfo } from '../../hooks/useContact';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { contactInfoSchema, ContactInfoFormData } from '../../schemas/adminSchemas';
import { ContactInfo } from '../../types/api';

const ContactInfoManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: contactInfo, isLoading, createContactInfo, updateContactInfo, deleteContactInfo } = useContactInfo();

  const columns = [
    {
      key: 'email',
      label: 'Contact Details',
      sortable: true,
      render: (value: string, item: ContactInfo) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.phone}</div>
        </div>
      )
    },
    {
      key: 'address',
      label: 'Address',
      render: (value: string) => (
        <div className="max-w-xs">
          <div className="text-sm text-gray-900 truncate">{value}</div>
        </div>
      )
    },
    {
      key: 'office_hours',
      label: 'Office Hours',
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value || 'Not specified'}</span>
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
    { name: 'address', label: 'Address', type: 'textarea' as const, required: true, rows: 3 },
    { name: 'phone', label: 'Phone Number', type: 'text' as const, required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, required: true },
    { name: 'office_hours', label: 'Office Hours', type: 'text' as const, placeholder: 'e.g., Monday-Friday 8:00 AM - 5:00 PM' },
    { name: 'is_active', label: 'Active', type: 'checkbox' as const }
  ];

  const handleCreate = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEdit = (contact: ContactInfo) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDelete = async (contact: ContactInfo) => {
    if (window.confirm('Are you sure you want to delete this contact information?')) {
      try {
        await deleteContactInfo.mutateAsync(contact.id);
      } catch (error) {
        console.error('Failed to delete contact info:', error);
      }
    }
  };

  const handleFormSubmit = async (data: ContactInfoFormData) => {
    try {
      if (editingContact) {
        await updateContactInfo.mutateAsync({ id: editingContact.id, data });
      } else {
        await createContactInfo.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingContact(null);
    } catch (error) {
      console.error('Failed to save contact info:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
        <div className="text-sm text-gray-500">
          Manage department contact details and office information
        </div>
      </div>

      {isFormOpen ? (
        <AdminForm
          title={editingContact ? 'Edit Contact Information' : 'Create Contact Information'}
          schema={contactInfoSchema}
          fields={formFields}
          defaultValues={editingContact}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={createContactInfo.isPending || updateContactInfo.isPending}
        />
      ) : (
        <AdminDataTable
          title="Contact Information"
          columns={columns}
          data={contactInfo || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          isLoading={isLoading}
          emptyMessage="No contact information found"
          searchPlaceholder="Search contact info..."
        />
      )}
    </div>
  );
};

export default ContactInfoManagement;



