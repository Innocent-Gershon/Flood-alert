import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AlertTriangleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { loginUser } from '../services/router'; // Ensure this path is correct
import bgImage from '../Images/loginbac.jpg'; 

interface Credentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const state = location.state as { message?: string };
    if (state?.message) {
      setError(state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // This 'data' variable will hold the response from your server.
      const data = await loginUser(credentials.email, credentials.password);

      // Log the server response to the console for debugging
      console.log('Data received from server:', data);

      // --- ✅ THE FIX IS HERE ---
      // Check if the expected data exists before saving to localStorage.
      if (data && data.token && data.user) {
        // Save all necessary items to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.name); // This saves the name
        localStorage.setItem('email', data.user.email);       // This saves the email

        // Clear guest status on successful login
        sessionStorage.removeItem('guest');

        setSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          // Notify other components (like the Sidebar) that storage has changed
          window.dispatchEvent(new Event("storage"));
          navigate('/home', { replace: true });
        }, 1000);

      } else {
        // Handle cases where the server response is not structured as expected
        setError('Login failed: Invalid data received from server.');
      }

    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGuestLogin = () => {
    sessionStorage.setItem('guest', 'true');
    // Also clear user-specific data for guest mode
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/home', { replace: true });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" aria-hidden="true"></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to access the platform</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-700 text-white font-semibold py-2 rounded-lg hover:bg-red-900 transition disabled:bg-red-400"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="text-center text-sm">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
              Register here
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center text-yellow-600 text-sm">
          <AlertTriangleIcon className="inline h-4 w-4 mr-1" />
          Emergency? Call <strong>112</strong> or{' '}
          <button
            onClick={handleGuestLogin}
            className="text-blue-700 underline font-semibold"
          >
            Continue as Guest
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}