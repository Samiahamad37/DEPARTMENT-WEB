import React from 'react';
import AdminManagement from '../../components/admin/AdminManagement';
import { useAdminBanners, useCreateAdminBanner, useUpdateAdminBanner, useDeleteAdminBanner } from '../../hooks/useAdmin';

const BannerManagement: React.FC = () => {
  const { data: banners = [], isLoading, error } = useAdminBanners();
  const createMutation = useCreateAdminBanner();
  const updateMutation = useUpdateAdminBanner();
  const deleteMutation = useDeleteAdminBanner();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">{item.subtitle}</div>
        </div>
      )
    },
    {
      key: 'background_image',
      label: 'Image',
      render: (value: string) => (
        <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden">
          {value ? (
            <img 
              src={value} 
              alt="Banner" 
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
      key: 'cta_text',
      label: 'CTA Text',
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
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter banner title'
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text' as const,
      placeholder: 'Enter banner subtitle'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter banner description',
      rows: 3
    },
    {
      name: 'background_image',
      label: 'Background Image',
      type: 'file' as const,
      required: true,
      accept: 'image/*',
      description: 'Upload a banner image'
    },
    {
      name: 'cta_text',
      label: 'Call-to-Action Text',
      type: 'text' as const,
      placeholder: 'e.g., Learn More, Get Started'
    },
    {
      name: 'cta_link',
      label: 'Call-to-Action Link',
      type: 'url' as const,
      placeholder: 'https://example.com'
    },
    {
      name: 'display_order',
      label: 'Display Order',
      type: 'number' as const,
      min: 0,
      description: 'Lower numbers appear first'
    },
    {
      name: 'show_highlights',
      label: 'Show Highlights',
      type: 'checkbox' as const,
      description: 'Enable highlight cards on this banner'
    },
    {
      name: 'highlight_1_text',
      label: 'Highlight 1 Text',
      type: 'text' as const,
      placeholder: 'e.g., Excellence in Education'
    },
    {
      name: 'highlight_2_text',
      label: 'Highlight 2 Text',
      type: 'text' as const,
      placeholder: 'e.g., Industry Partnerships'
    },
    {
      name: 'highlight_3_text',
      label: 'Highlight 3 Text',
      type: 'text' as const,
      placeholder: 'e.g., Research Impact'
    },
    {
      name: 'overlay_opacity',
      label: 'Overlay Opacity',
      type: 'number' as const,
      min: 0,
      max: 1,
      step: 0.1,
      description: 'Background image overlay opacity (0.0 to 1.0)'
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox' as const
    }
  ];

  const initialFormData = {
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    cta_text: '',
    cta_link: '',
    display_order: 0,
    show_highlights: false,
    highlight_1_text: '',
    highlight_2_text: '',
    highlight_3_text: '',
    overlay_opacity: 0.4,
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
      title="Banners"
      data={banners}
      isLoading={isLoading}
      error={error}
      columns={columns}
      formFields={formFields}
      initialFormData={initialFormData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchFields={['title', 'subtitle', 'description']}
    />
  );
};

export default BannerManagement;