import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuIcon, XIcon, BellIcon, AlertTriangleIcon,
  HomeIcon, LogOutIcon, UserIcon, Settings2Icon, MessageSquareIcon
} from 'lucide-react';
import logoImage from '../Images/logo121.png'; 


const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // State for user details
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'user@example.com');
  
  // State for the notification count
  const [notificationCount, setNotificationCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // This effect now handles both user details and the report notification count
  useEffect(() => {
    const handleStorageChange = () => {
      // Update user details
      setUsername(localStorage.getItem('username') || 'User');
      setEmail(localStorage.getItem('email') || 'user@example.com');

      // Update notification count by reading from 'reports' in localStorage
      const reports = JSON.parse(localStorage.getItem('reports') || '[]');
      const newReportsCount = reports.filter((report: { viewed: any; }) => !report.viewed).length;
      setNotificationCount(newReportsCount);
    };

    // Listen for the 'storage' event which we dispatch from other components
    window.addEventListener('storage', handleStorageChange);

    // Run the function on initial mount to get the current counts
    handleStorageChange(); 

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: BellIcon },
    { name: 'Community Reporting', href: '/community-reporting', icon: MessageSquareIcon },
    { name: 'Emergency Response', href: '/emergency-response', icon: AlertTriangleIcon },
    { name: 'Admin Panel', href: '/admin', icon: Settings2Icon }
  ];

  // --- Handlers for the Logout Confirmation Modal (functionality is preserved) ---
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    // Clear user and app data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    
    // Update state to reflect logout immediately
    setUsername('User');
    setEmail('user@example.com');
    setNotificationCount(0); // Reset notification count on logout

    setIsLogoutModalOpen(false);
    navigate('/'); // Navigate to the landing page
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-md shadow-md"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-blue-900 text-white h-screen w-64 fixed left-0 top-0 shadow-lg">
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center space-x-2">
          <img src={logoImage} alt="Flood Alert Ghana Logo" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Flood Alert Ghana</h1>
              <p className="text-xs text-blue-200">Protecting communities</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow py-6 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {/* --- ✅ NOTIFICATION BADGE ADDED HERE --- */}
                    {item.name === 'Dashboard' && notificationCount > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 p-2 rounded-full">
                <UserIcon className="h-5 w-5 text-blue-200" />
              </div>
              <div>
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-blue-300">{email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            className="flex items-center space-x-2 w-full px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-colors"
          >
            <LogOutIcon className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white shadow-lg flex flex-col">
            <div className="p-4 border-b border-blue-800">
              <h1 className="text-xl font-bold">Flood Alert Ghana</h1>
            </div>
            <nav className="flex-grow py-6 px-4">
              <ul className="space-y-2">
                {navigation.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === item.href ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      {/* --- ✅ NOTIFICATION BADGE ADDED FOR MOBILE --- */}
                      {item.name === 'Dashboard' && notificationCount > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-blue-800">
              <button
                onClick={handleLogoutClick}
                className="flex items-center space-x-2 w-full px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-colors"
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-gray-800">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelLogout} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
                No
              </button>
              <button onClick={confirmLogout} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;