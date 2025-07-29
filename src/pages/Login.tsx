import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AlertTriangleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import logo from '../Images/logo121.png';
import bgImage from '../Images/loginbac.jpg';
import hero1 from '../Images/hero1.jpg';
import hero2 from '../Images/hero3.jpg';
import hero3 from '../Images/hero2.jpg';
import { loginUser } from '../services/router';

interface Credentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showLoginCard, setShowLoginCard] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await loginUser(credentials.email, credentials.password);
      const { token } = data;
      localStorage.setItem('token', token);
      setSuccess('Login successful! Redirecting...');
      setCredentials({ email: '', password: '', rememberMe: false });
      setTimeout(() => {
        navigate(from, { state: { fromLogin: true } });
      }, 1000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const publicRoutes = ['/', '/login', '/register'];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Top Header */}
      <div className="bg-[#f4f4ff] min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
          <img src={logo} alt="Logo" className="h-10" />
          <div className="hidden md:flex gap-8 items-center text-lg font-medium">
            <a href="#" className="hover:text-blue-600">Home</a>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>

            <button
              onClick={() => setShowLoginCard(true)}
              className="hover:text-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-24 py-12 flex-1">
          {/* Left Text Section */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Stay Ahead of<br />
              <span className="text-blue-600">Dangerous</span> <br />
              <span className="text-blue-600">Flood</span> Situation
            </h1>
            <p className="text-gray-700 text-lg max-w-md">
              Get Real-Time Alerts, Trusted Emergency Responders, and a Community That Cares About Your Safety!
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-yellow-300 text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-yellow-400 transition"
            >
              Get Started
            </button>
          </div>

          {/* Right Images Section */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 items-center justify-center">
            <img src={hero1} alt="Student 1" className="rounded-[100px]" />
            <img src={hero2} alt="Student 2" className="rounded-[100px]" />
            <img src={hero3} alt="Graduate" className="rounded-[100px] col-span-2 w-full" />
          </div>
        </section>
      </div>

      {/* Login Modal */}
      {showLoginCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
              <p className="text-gray-500 text-sm">Sign in to access the platform</p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                ✅ {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={credentials.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm">Remember me</label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white font-semibold py-2 rounded-lg hover:bg-red-900 transition"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <div className="text-center text-sm">
                Don’t have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Register here
                </Link>
              </div>
            </form>
            <div className="mt-6 text-center text-yellow-600 text-sm">
              <AlertTriangleIcon className="inline h-4 w-4 mr-1" />
              Emergency? Call <strong>112</strong> or{' '}
              <button
                onClick={() => {
                  sessionStorage.setItem('guest', 'true');
                  localStorage.removeItem('token');
                  setShowLoginCard(false); // Close the modal
                  navigate('/home', { replace: true }); // Navigate to home
                }}
                className="text-blue-700 underline"
              >
                Continue as Guest
              </button>
            </div>


            <div className="text-center mt-4">
              <button
                className="text-sm text-gray-500 hover:underline"
                onClick={() => setShowLoginCard(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
