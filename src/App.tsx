import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CommunityReporting from './pages/CommunityReporting';
import EmergencyResponse from './pages/EmergencyResponse';
import AdminPanel from './pages/AdminPanel';
// Protected route wrapper component
const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  // Check if user has token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  // Check if user is coming from login page
  const fromLogin = location.state?.fromLogin || false;
  // Consider the user authenticated if they have a token or are coming from login
  if (!isAuthenticated && !fromLogin) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace state={{
      from: location
    }} />;
  }
  return <>{children}</>;
};
export function App() {
  return <Router>
      <Routes>
        {/* Login route - accessible to all */}
        <Route path="/login" element={<Login />} />
        {/* Home route - protected */}
        <Route path="/" element={<ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <Home />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>} />
        {/* Dashboard route - protected */}
        <Route path="/dashboard" element={<ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <Dashboard />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>} />
        {/* Community reporting route - protected */}
        <Route path="/community-reporting" element={<ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <CommunityReporting />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>} />
        {/* Emergency response route - protected */}
        <Route path="/emergency-response" element={<ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <EmergencyResponse />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>} />
        {/* Admin panel route - protected */}
        <Route path="/admin" element={<ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <AdminPanel />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>} />
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>;
}