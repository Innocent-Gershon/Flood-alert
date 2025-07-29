import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';
import Login from './pages/Login.js';
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CommunityReporting from './pages/CommunityReporting.tsx';
import EmergencyResponse from './pages/EmergencyResponse.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import Register from './pages/Register.tsx';
import Contact from './pages/Contact.tsx';

// ✅ ProtectedRoute logic with guest support
type ProtectedRouteProps = {
  children: React.ReactNode;
  allowGuest?: boolean;
};

const ProtectedRoute = ({ children, allowGuest = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isGuest = sessionStorage.getItem('guest') === 'true';

  if (!token && !(allowGuest && isGuest)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Prevent guests from accessing anything beyond /home
  if (!token && !allowGuest && isGuest) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Home - guests and logged-in users allowed */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowGuest>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <Home />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* ✅ Logged-in users only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <Dashboard />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community-reporting"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <CommunityReporting />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency-response"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <EmergencyResponse />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex flex-col flex-grow md:ml-64">
                  <main className="flex-grow p-6">
                    <AdminPanel />
                  </main>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* ✅ Unknown routes redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
