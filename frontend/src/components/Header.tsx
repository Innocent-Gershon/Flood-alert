import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, BellIcon, AlertTriangleIcon, HomeIcon, LogOutIcon, UserIcon } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
    icon: AlertTriangleIcon
  }, {
    name: 'Emergency Response',
    href: '/emergency-response',
    icon: AlertTriangleIcon
  }, {
    name: 'Admin Panel',
    href: '/admin',
    icon: AlertTriangleIcon
  }];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleLogout = () => {
    // In a real application, you would clear authentication tokens here
    // For this demo, we'll just navigate to login
    navigate('/login');
  };
  return <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">Flood Alert Ghana</h1>
              <p className="text-xs text-blue-200">
                Protecting vulnerable communities
              </p>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <nav className="flex space-x-6 mr-6">
              {navigation.map(item => {
              const Icon = item.icon;
              return <Link key={item.name} to={item.href} className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-blue-800 transition-colors ${location.pathname === item.href ? 'bg-blue-700' : ''}`}>
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>;
            })}
            </nav>
            {/* Desktop Logout Button */}
            <div className="relative">
              <button onClick={toggleUserMenu} className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors">
                <UserIcon className="h-4 w-4" />
                <span>Account</span>
              </button>
              {isUserMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOutIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Log out</span>
                  </button>
                </div>}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none" onClick={toggleMenu} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 space-y-2">
            {navigation.map(item => {
          const Icon = item.icon;
          return <Link key={item.name} to={item.href} className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-800 transition-colors ${location.pathname === item.href ? 'bg-blue-700' : ''}`} onClick={() => setIsMenuOpen(false)}>
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>;
        })}
            {/* Mobile Logout Button */}
            <button onClick={handleLogout} className="flex items-center justify-between w-full p-2 rounded bg-blue-700 hover:bg-blue-600 transition-colors">
              <div className="flex items-center space-x-2">
                <LogOutIcon className="h-5 w-5" />
                <span>Log out</span>
              </div>
            </button>
          </nav>}
      </div>
    </header>;
};
export default Header;