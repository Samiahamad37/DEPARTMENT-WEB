import React, { useState } from 'react';
import { useAdminEvents } from '../../hooks/useAdmin';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminForm from '../../components/admin/AdminForm';
import { AdminEvent } from '../../types/admin';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { Calendar } from 'lucide-react';

const EventManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: events, isLoading, mutate: createEvent, mutate: updateEvent, mutate: deleteEvent } = useAdminEvents();

  const handleEdit = (event: AdminEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (event: AdminEvent) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      deleteEvent(event.id);
    }
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSave = (data: Partial<AdminEvent>) => {
    if (editingEvent) {
      updateEvent({ id: editingEvent.id, data });
    } else {
      createEvent(data);
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const filteredData = events?.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
  ];

  const formFields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'ongoing', label: 'Ongoing' },
      { value: 'completed', label: 'Completed' },
    ]},
    { name: 'image', label: 'Image', type: 'file' },
    { name: 'is_featured', label: 'Featured', type: 'checkbox' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Event Management"
        description="Manage events and activities"
        icon={Calendar}
      />

      {isFormOpen ? (
        <AdminForm
          title={editingEvent ? 'Edit Event' : 'Create Event'}
          fields={formFields}
          initialData={editingEvent}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      ) : (
        <AdminDataTable
          title="Events"
          columns={columns}
          data={paginatedData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onSearch={handleSearch}
          searchTerm={searchQuery}
          isLoading={isLoading}
          emptyMessage="No events found"
          searchPlaceholder="Search events..."
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={totalItems}
        />
      )}
    </div>
  );
};

export default EventManagement;

