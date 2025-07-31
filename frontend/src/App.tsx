import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ShieldOffIcon } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; // --- ✅ 1. IMPORT THE DECODING LIBRARY ---

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

// --- ACCESS DENIED MODAL (No changes here) ---
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
          onClick={() => navigate(-1)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// --- ✅ 2. HELPER FUNCTION & UPGRADED PROTECTED ROUTE ---
type ProtectedRouteProps = {
  children: React.ReactNode;
  allowGuest?: boolean;
  roles?: string[];
};

/**
 * Decodes the JWT token from localStorage to get the user's role.
 * @returns {string|null} The user's role (e.g., 'admin') or null if not found.
 */
const getUserRoleFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    // Define the expected structure of the decoded token
    const decodedToken: { role?: string } = jwtDecode(token);
    // Return the role, or null if it doesn't exist in the token
    return decodedToken.role || null;
  } catch (error) {
    console.error("Invalid token:", error);
    // If token is malformed, treat the user as having no role
    return null;
  }
};

const ProtectedRoute = ({ children, allowGuest = false, roles = [] }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = getUserRoleFromToken(); // Get role from the token
  const isGuest = sessionStorage.getItem('guest') === 'true';

  // Guest handling logic (no change)
  if (isGuest) {
    if (allowGuest) {
      return <>{children}</>;
    }
    return <Navigate to="/login" replace state={{ message: 'Please log in to access this page. Guest access is limited.' }} />;
  }

  // User not logged in (no change)
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // Role check logic now works correctly with the role from the token
  if (roles.length > 0 && (!userRole || !roles.includes(userRole))) {
    return (
      <AppLayout>
        <AccessDeniedModal />
      </AppLayout>
    );
  }

  // If all checks pass, render the requested page
  return <>{children}</>;
};

// --- APP LAYOUT (No changes here) ---
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

// --- APP ROUTES (No changes here) ---
export function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes with Role Definitions */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowGuest>
              <AppLayout><Home /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community-reporting"
          element={
            <ProtectedRoute>
              <AppLayout><CommunityReporting /></AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin-Only Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout><Dashboard /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency-response"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout><EmergencyResponse /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout><AdminPanel /></AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}