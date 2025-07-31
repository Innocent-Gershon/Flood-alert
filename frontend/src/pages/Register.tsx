// Register.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../../backend/services/router'; // Ensure this path is correct
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';
import slide4 from '../Images/slide4.jpg';
import logo from '../Images/logo121.png';

const images = [slide1, slide2, slide3, slide4];

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'community',
  });

  const [modal, setModal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setModal('⚠️ All fields are required.');
      return;
    }

    if (!validateEmail(form.email)) {
      setModal('⚠️ Please enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setModal('⚠️ Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setModal('⚠️ Passwords do not match.');
      return;
    }

    const { confirmPassword, ...submitForm } = form;

    try {
      console.log("Hello")
      await registerUser(submitForm);
      setModal('✅ Registration successful! Click OK to login.');
    } catch (err: any) {
      console.log(err)
      const errorMessage = err?.response?.data?.message;
      setModal(errorMessage);
    }
  };

  const handleModalClose = () => {
    if (modal.includes('successful')) {
      navigate('/login');
    }
    setModal('');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans">
      {/* Left: Hero */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
        <img
          key={slide}
          src={images[slide]}
          alt="Slide"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-all duration-1000 ease-in-out"
        />
        <div className="relative z-10 p-6 md:p-12 text-center text-white bg-black bg-opacity-60 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-yellow-300 drop-shadow animate-fade-in">
            Welcome to <span className="text-white">GhaFlood</span>
          </h1>
          <p className="text-base md:text-xl font-light leading-relaxed drop-shadow max-w-md">
            Be part of Ghana’s real-time flood alert network. Stay safe. Stay informed.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 bg-white">
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 transition-all"
        >
          {/* Logo at the top */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Platform Logo" className="h-12 sm:h-16 object-contain" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
            Create Your Account
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />

          {/* Password Field */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition-all"
            />
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition-all"
            />
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </div>
          </div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="community">Community Member</option>
            <option value="responder">Responder</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full relative overflow-hidden text-white font-semibold py-3 rounded-xl shadow-md group transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:from-green-500 group-hover:to-green-600 transition-all duration-500 ease-out"></span>
            <span className="relative z-10">Register</span>
          </button>
          {/* Add this inside the <form> tag, after the register button */}
          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Login
              </Link>
            </p>
          </div>

        </form>
        {/* Add this outside the <form> tag, at the bottom of the card */}

      <div className="text-center mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-transparent rounded-lg border-2 border-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-11/12 max-w-sm text-center animate-fade-in">
            <p className="text-gray-800 mb-4">{modal}</p>
            <button
              onClick={handleModalClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;