import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminContext';
import AdminLayout from '../components/admin/AdminLayout';
import MasterAdminManagement from './admin/MasterAdminManagement';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, mustChangePassword } = useAdminAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Redirect if must change password
  if (mustChangePassword) {
    return <Navigate to="/admin/change-password" replace />;
  }

  return (
    <AdminLayout>
      <MasterAdminManagement />
    </AdminLayout>
  );
};

export default AdminDashboard;

