import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate, // Import useNavigate
} from 'react-router-dom';
import { ShieldOffIcon } from 'lucide-react'; // For the new modal

// Component & Page Imports
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import Register from './pages/Register.tsx';
import Contact from './pages/Contact.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CommunityReporting from './pages/CommunityReporting.tsx';
import EmergencyResponse from './pages/EmergencyResponse.tsx';
import AdminPanel from './pages/AdminPanel.tsx';

// --- ✅ NEW: ACCESS DENIED MODAL ---
// A stylish pop-up to inform users they don't have access.
const AccessDeniedModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 text-center shadow-2xl max-w-md w-full mx-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-5">
          <ShieldOffIcon className="h-9 w-9 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. This area is restricted to administrators only.
        </p>
        <button
          onClick={() => navigate(-1)} // Takes the user back to the previous page
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};


// --- ✅ UPGRADED: PROTECTED ROUTE WITH ROLE-BASED ACCESS CONTROL ---
type ProtectedRouteProps = {
  children: React.ReactNode;
  allowGuest?: boolean;
  roles?: string[]; // New prop to define allowed roles
};

const ProtectedRoute = ({ children, allowGuest = false, roles = [] }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get the user's role
  const isGuest = sessionStorage.getItem('guest') === 'true';

  // Guest handling (no changes here)
  if (isGuest) {
    if (allowGuest) {
      return <>{children}</>;
    } else {
      return (
        <Navigate
          to="/login"
          replace
          state={{ message: 'Please log in to access this page. Guest access is limited.' }}
        />
      );
    }
  }

  // Not logged in (no changes here)
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // --- NEW ROLE CHECK ---
  // If the route requires specific roles AND the user's role is not included...
  if (roles.length > 0 && (!userRole || !roles.includes(userRole))) {
    // ...show the Access Denied modal instead of the page.
    return (
        <>
          <AppLayout>
            {/* We render the modal on top of the existing layout for a seamless experience */}
            <AccessDeniedModal />
          </AppLayout>
        </>
    );
  }

  // If all checks pass, render the requested page
  return <>{children}</>;
};

// AppLayout Component (no changes here)
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex flex-col flex-grow md:ml-64">
      <main className="flex-grow p-6">
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

export function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- PROTECTED ROUTES (now with role definitions) --- */}
        
        {/* Home is accessible to guests and all logged-in users */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowGuest>
              <AppLayout>
                <Home />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Community Reporting is accessible to all logged-in users */}
        <Route
          path="/community-reporting"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CommunityReporting />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* --- ADMIN-ONLY ROUTES --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency-response"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout>
                <EmergencyResponse />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout>
                <AdminPanel />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}