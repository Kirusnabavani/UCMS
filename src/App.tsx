import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CourseManagement from './components/admin/CourseManagement';
import CourseForm from './components/admin/CourseForm';
import BrowseCourses from './components/student/BrowseCourses';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Admin Routes */}
        <Route path="/courses" element={
          <ProtectedRoute requiredRole="admin">
            <CourseManagement />
          </ProtectedRoute>
        } />
        <Route path="/courses/new" element={
          <ProtectedRoute requiredRole="admin">
            <CourseForm />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id/edit" element={
          <ProtectedRoute requiredRole="admin">
            <CourseForm />
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute requiredRole="admin">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Management</h2>
              <p className="text-gray-600">Student management features coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/results" element={
          <ProtectedRoute requiredRole="admin">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Results Management</h2>
              <p className="text-gray-600">Results management features coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Student Routes */}
        <Route path="/browse-courses" element={
          <ProtectedRoute requiredRole="student">
            <BrowseCourses />
          </ProtectedRoute>
        } />
        <Route path="/my-courses" element={
          <ProtectedRoute requiredRole="student">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h2>
              <p className="text-gray-600">Registered courses view coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/my-results" element={
          <ProtectedRoute requiredRole="student">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Results</h2>
              <p className="text-gray-600">Student results view coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <AppContent />
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;