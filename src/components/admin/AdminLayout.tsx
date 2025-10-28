import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminContext";
import {
  BarChart3,
  Newspaper,
  Image,
  Users,
  FolderOpen,
  GraduationCap,
  Microscope,
  Building,
  Phone,
  Share2,
  Calendar,
  Award,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Home,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: BarChart3,
      current: location.pathname === "/admin/dashboard",
    },
    {
      name: "News Management",
      href: "/admin/news",
      icon: Newspaper,
      current: location.pathname === "/admin/news",
    },
    {
      name: "Banner Management",
      href: "/admin/banners",
      icon: Image,
      current: location.pathname === "/admin/banners",
    },
    {
      name: "Team Management",
      href: "/admin/team",
      icon: Users,
      current: location.pathname === "/admin/team",
    },
    {
      name: "Project Management",
      href: "/admin/projects",
      icon: FolderOpen,
      current: location.pathname === "/admin/projects",
    },
    {
      name: "Programme Management",
      href: "/admin/programmes",
      icon: GraduationCap,
      current: location.pathname === "/admin/programmes",
    },
    {
      name: "Research Areas",
      href: "/admin/research-areas",
      icon: Microscope,
      current: location.pathname === "/admin/research-areas",
    },
    {
      name: "Department Info",
      href: "/admin/department-info",
      icon: Building,
      current: location.pathname === "/admin/department-info",
    },
    {
      name: "Contact Info",
      href: "/admin/contact-info",
      icon: Phone,
      current: location.pathname === "/admin/contact-info",
    },
    {
      name: "Social Media",
      href: "/admin/social-media",
      icon: Share2,
      current: location.pathname === "/admin/social-media",
    },
    {
      name: "Milestones",
      href: "/admin/milestones",
      icon: Calendar,
      current: location.pathname === "/admin/milestones",
    },
    {
      name: "Achievements",
      href: "/admin/achievements",
      icon: Award,
      current: location.pathname === "/admin/achievements",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { name: "Admin", href: "/admin/dashboard", icon: Home },
    ];

    if (pathSegments.length > 1) {
      const currentItem = navigationItems.find(
        (item) => item.href === location.pathname
      );
      if (currentItem) {
        breadcrumbs.push({
          name: currentItem.name,
          href: currentItem.href,
          icon: currentItem.icon,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-orange-100 text-orange-900 border-r-2 border-orange-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">Admin User</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar with breadcrumbs */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 ml-4">
                {breadcrumbs.map((breadcrumb, index) => {
                  const BreadcrumbIcon = breadcrumb.icon;
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <div key={breadcrumb.href} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                      )}
                      <button
                        onClick={() => navigate(breadcrumb.href)}
                        className={`flex items-center text-sm font-medium transition-colors ${
                          isLast
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <BreadcrumbIcon className="h-4 w-4 mr-1" />
                        {breadcrumb.name}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-medium text-sm">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.username}
                  </span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
