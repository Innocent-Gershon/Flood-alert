import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AlertTriangleIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // In a real app, this would call your backend API
      // const response = await fetch('http://localhost:5000/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: credentials.email,
      //     password: credentials.password,
      //   }),
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   localStorage.setItem('token', data.token);
      //   navigate(from, { state: { fromLogin: true } });
      // } else {
      //   setError(data.message || 'Login failed');
      // }
      // For demo purposes, simulate successful login
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token-12345');
        setIsLoading(false);
        navigate(from, {
          state: {
            fromLogin: true
          }
        });
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-800 to-blue-900">
      {/* Header Logo */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center md:justify-start">
          <AlertTriangleIcon className="h-8 w-8 text-yellow-400" />
          <div className="ml-2">
            <h1 className="text-xl font-bold text-white">Flood Alert Ghana</h1>
            <p className="text-xs text-blue-200">
              Protecting vulnerable communities
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
          {/* Login Header */}
          <div className="bg-blue-50 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <UserIcon className="h-8 w-8 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
            <p className="text-gray-600 mt-1">
              Sign in to access the Flood Alert Platform
            </p>
          </div>
          {/* Login Form */}
          <div className="px-6 py-8">
            {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md mb-4 text-sm flex items-start">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Username
                </label>
                <div className="relative">
                  <input type="text" id="email" name="email" value={credentials.email} onChange={handleChange} className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email or username" required />
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={credentials.password} onChange={handleChange} className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" required />
                  <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" name="rememberMe" checked={credentials.rememberMe} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </> : 'Sign in'}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-800">
                  Register here
                </Link>
              </p>
            </div>
          </div>
          {/* Emergency Access */}
          <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100">
            <div className="flex items-center justify-center text-sm">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-yellow-700">
                <strong>Emergency?</strong> Call the hotline at{' '}
                <strong>112</strong> or{' '}
                <Link to="/" className="font-medium text-blue-600 hover:underline" state={{
                fromLogin: true
              }}>
                  continue as guest
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-blue-200">
          <p>
            © {new Date().getFullYear()} Flood Alert Ghana. All rights
            reserved.
          </p>
          <p className="mt-1">
            A project by Innocent Nangah, African Leadership University
          </p>
        </div>
      </div>
    </div>;
};
export default Login;