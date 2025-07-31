import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import bgImage from '../Images/loginbac.jpg'; // Reusing the same background for consistency

const ForgotPassword: React.FC = () => {
  // State variables are now strongly typed
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  // The form event is typed with React.FormEvent
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    // --- Backend Integration Point ---
    // This is where you would make an API call to your backend
    // to trigger the password reset email.
    try {
      // Example: await requestPasswordReset(email);
      console.log('Requesting password reset for:', email);

      // Simulate a successful API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage('If an account with that email exists, a password reset link has been sent.');
      setEmail(''); // Clear the input field on success
    } catch (err: any) { // Type the error object to access its properties
      setError(err?.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" aria-hidden="true"></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Forgot Your Password?</h2>
          <p className="text-gray-500 text-sm mt-2">
            No problem. Enter your email address below and we'll send you a link to reset it.
          </p>
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 sr-only">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                // The input change event is typed with React.ChangeEvent
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;