import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ProfileEdit } from './pages/admin/ProfileEdit';
import { ProjectsList } from './pages/admin/ProjectsList';
import { ProjectForm } from './pages/admin/ProjectForm';
import { SkillsList } from './pages/admin/SkillsList';
import { SkillForm } from './pages/admin/SkillForm';
import { ExperiencesList } from './pages/admin/ExperiencesList';
import { ExperienceForm } from './pages/admin/ExperienceForm';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/test" element={<div className="text-white p-10">Test Route - Firebase Migration In Progress</div>} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="profile" element={<ProfileEdit />} />
                      <Route path="projects" element={<ProjectsList />} />
                      <Route path="projects/new" element={<ProjectForm />} />
                      <Route path="projects/edit/:id" element={<ProjectForm />} />
                      <Route path="skills" element={<SkillsList />} />
                      <Route path="skills/new" element={<SkillForm />} />
                      <Route path="skills/edit/:id" element={<SkillForm />} />
                      <Route path="experiences" element={<ExperiencesList />} />
                      <Route path="experiences/new" element={<ExperienceForm />} />
                      <Route path="experiences/edit/:id" element={<ExperienceForm />} />
                    </Route>
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;