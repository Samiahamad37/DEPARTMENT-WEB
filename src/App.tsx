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
import AnnouncementManagement from "./pages/admin/AnnouncementManagement";
import AdminLayout from "./components/admin/AdminLayout";
import ProjectDetails from "./pages/ProjectDetails";
import NewsDetails from "./pages/NewsDetails";
import AnnouncementDetails from "./pages/AnnouncementDetails";

function App() {
  return (
    <QueryProvider>
      <AdminProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/about/people" element={<Layout><OurPeople /></Layout>} />
            <Route path="/about/department" element={<Layout><OurDepartment /></Layout>} />
            <Route path="/about/hire-students" element={<Layout><HireOurStudents /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/programmes" element={<Layout><Programs /></Layout>} />
            <Route path="/collaboration" element={<Layout><Collaboration /></Layout>} />
            <Route path="/research" element={<Layout><Research /></Layout>} />
            <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
            <Route path="/outreach" element={<Layout><Collaboration /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/data" element={<Layout><Data /></Layout>} />
            <Route path="/information" element={<Layout><Information /></Layout>} />
            <Route path="/networking" element={<Layout><Networking /></Layout>} />
            <Route path="/masters" element={<Layout><Masters /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/news-page" element={<Layout><NewsPage /></Layout>} />
            <Route path="/projects-page" element={<Layout><ProjectsPage /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsDetails /></Layout>} />
            <Route path="/projects/:id" element={<Layout><ProjectDetails /></Layout>} />
            <Route path="/announcements/:id" element={<Layout><AnnouncementDetails /></Layout>} />
            <Route path="/prospective-student" element={<Layout><ProspectiveStudent /></Layout>} />
            <Route path="/api-test" element={<Layout><ApiTest /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/change-password" element={<AdminChangePassword />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminLogin />} />
            
            {/* Admin Content Management Routes */}
            <Route path="/admin/news" element={<AdminLayout><NewsManagement /></AdminLayout>} />
            <Route path="/admin/announcements" element={<AdminLayout><AnnouncementManagement /></AdminLayout>} />
            <Route path="/admin/banners" element={<AdminLayout><BannerManagement /></AdminLayout>} />
            <Route path="/admin/team" element={<AdminLayout><TeamManagement /></AdminLayout>} />
            <Route path="/admin/projects" element={<AdminLayout><ProjectManagement /></AdminLayout>} />
            <Route path="/admin/programmes" element={<AdminLayout><ProgrammeManagement /></AdminLayout>} />
            <Route path="/admin/department-info" element={<AdminLayout><DepartmentInfoManagement /></AdminLayout>} />
            <Route path="/admin/contact-info" element={<AdminLayout><ContactInfoManagement /></AdminLayout>} />
            <Route path="/admin/social-media" element={<AdminLayout><SocialMediaManagement /></AdminLayout>} />
            <Route path="/admin/milestones" element={<AdminLayout><MilestoneManagement /></AdminLayout>} />
            <Route path="/admin/achievements" element={<AdminLayout><AchievementManagement /></AdminLayout>} />
            <Route path="/admin/research-areas" element={<AdminLayout><ResearchAreaManagement /></AdminLayout>} />
          </Routes>
        </Router>
      </AdminProvider>
    </QueryProvider>
  );
}

export default App;
