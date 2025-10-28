import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { AdminProvider } from "./contexts/AdminContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About_fixed";
import OurPeople from "./pages/OurPeople";
import OurDepartment from "./pages/OurDepartment";
import HireOurStudents from "./pages/HireOurStudents";
import Collaboration from "./pages/Collaboration";
import Research from "./pages/Research";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Data from "./pages/Data";
import Information from "./pages/Information";
import Networking from "./pages/Networking";
import Masters from "./pages/Masters";
import News from "./pages/News";
import ProspectiveStudent from "./pages/ProspectiveStudent";
import NewsPage from "./pages/NewsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ApiTest from "./components/ApiTest";
import AdminLogin from "./pages/AdminLogin";
import AdminChangePassword from "./pages/AdminChangePassword";
import AdminDashboard from "./pages/AdminDashboard";
import NewsManagement from "./pages/admin/NewsManagement";
import BannerManagement from "./pages/admin/BannerManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import ProgrammeManagement from "./pages/admin/ProgrammeManagement";
import DepartmentInfoManagement from "./pages/admin/DepartmentInfoManagement";
import ContactInfoManagement from "./pages/admin/ContactInfoManagement";
import SocialMediaManagement from "./pages/admin/SocialMediaManagement";
import MilestoneManagement from "./pages/admin/MilestoneManagement";
import AchievementManagement from "./pages/admin/AchievementManagement";
import ResearchAreaManagement from "./pages/admin/ResearchAreaManagement";
import ProjectDetails from "./pages/ProjectDetails";
import NewsDetails from "./pages/NewsDetails";
import ResearchDetails from "./pages/ResearchDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <QueryProvider>
      <AdminProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/about/people"
              element={
                <Layout>
                  <OurPeople />
                </Layout>
              }
            />
            <Route
              path="/about/department"
              element={
                <Layout>
                  <OurDepartment />
                </Layout>
              }
            />
            <Route
              path="/about/hire-students"
              element={
                <Layout>
                  <HireOurStudents />
                </Layout>
              }
            />
            <Route
              path="/programmes"
              element={
                <Layout>
                  <Programs />
                </Layout>
              }
            />

            <Route
              path="/research"
              element={
                <Layout>
                  <Research />
                </Layout>
              }
            />
            <Route
              path="/facilities"
              element={
                <Layout>
                  <Facilities />
                </Layout>
              }
            />
            <Route
              path="/outreach"
              element={
                <Layout>
                  <Collaboration />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />

            <Route
              path="/news-page"
              element={
                <Layout>
                  <NewsPage />
                </Layout>
              }
            />
            <Route
              path="/projects-page"
              element={
                <Layout>
                  <ProjectsPage />
                </Layout>
              }
            />
            <Route
              path="/news/:id"
              element={
                <Layout>
                  <NewsDetails />
                </Layout>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <Layout>
                  <ProjectDetails />
                </Layout>
              }
            />
            <Route
              path="/research/:id"
              element={
                <Layout>
                  <ResearchDetails />
                </Layout>
              }
            />
            <Route
              path="/prospective-student"
              element={
                <Layout>
                  <ProspectiveStudent />
                </Layout>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/change-password"
              element={<AdminChangePassword />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin Content Management Routes - Protected */}
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <NewsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/banners"
              element={
                <ProtectedRoute>
                  <BannerManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team"
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ProjectManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programmes"
              element={
                <ProtectedRoute>
                  <ProgrammeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/department-info"
              element={
                <ProtectedRoute>
                  <DepartmentInfoManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact-info"
              element={
                <ProtectedRoute>
                  <ContactInfoManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/social-media"
              element={
                <ProtectedRoute>
                  <SocialMediaManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/milestones"
              element={
                <ProtectedRoute>
                  <MilestoneManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/achievements"
              element={
                <ProtectedRoute>
                  <AchievementManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/research-areas"
              element={
                <ProtectedRoute>
                  <ResearchAreaManagement />
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AdminProvider>
    </QueryProvider>
  );
}

export default App;
