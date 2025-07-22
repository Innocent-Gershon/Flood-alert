import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, BellIcon, AlertTriangleIcon, HomeIcon, LogOutIcon, UserIcon, Settings2Icon, MessageSquareIcon } from 'lucide-react';
const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [{
    name: 'Home',
    href: '/',
    icon: HomeIcon
  }, {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BellIcon
  }, {
    name: 'Community Reporting',
    href: '/community-reporting',
    icon: MessageSquareIcon
  }, {
    name: 'Emergency Response',
    href: '/emergency-response',
    icon: AlertTriangleIcon
  }, {
    name: 'Admin Panel',
    href: '/admin',
    icon: Settings2Icon
  }];
  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('token');
    // Navigate to login page
    navigate('/login');
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <>
      {/* Mobile menu button */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-md shadow-md" onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
        {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-blue-900 text-white h-screen w-64 fixed left-0 top-0 shadow-lg">
        {/* Logo */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">Flood Alert Ghana</h1>
              <p className="text-xs text-blue-200">Protecting communities</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-grow py-6 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map(item => {
            const Icon = item.icon;
            return <li key={item.name}>
                  <Link to={item.href} className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname === item.href ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>;
          })}
          </ul>
        </nav>
        {/* User Profile & Logout */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 p-2 rounded-full">
                <UserIcon className="h-5 w-5 text-blue-200" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-blue-300">admin@floodalert.org</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 w-full px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-colors">
            <LogOutIcon className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
      {/* Mobile Sidebar */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 z-40">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMobileMenu}></div>
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white shadow-lg">
            {/* Logo */}
            <div className="p-4 border-b border-blue-800">
              <div className="flex items-center space-x-2">
                <AlertTriangleIcon className="h-8 w-8 text-yellow-400" />
                <div>
                  <h1 className="text-xl font-bold">Flood Alert Ghana</h1>
                  <p className="text-xs text-blue-200">
                    Protecting communities
                  </p>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex-grow py-6 px-4 overflow-y-auto">
              <ul className="space-y-2">
                {navigation.map(item => {
              const Icon = item.icon;
              return <li key={item.name}>
                      <Link to={item.href} className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname === item.href ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`} onClick={toggleMobileMenu}>
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>;
            })}
              </ul>
            </nav>
            {/* User Profile & Logout */}
            <div className="p-4 border-t border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-700 p-2 rounded-full">
                    <UserIcon className="h-5 w-5 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-blue-300">
                      admin@floodalert.org
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center space-x-2 w-full px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-colors">
                <LogOutIcon className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>}
    </>;
};
export default Sidebar;