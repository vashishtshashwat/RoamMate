import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use `useNavigate` instead of `useHistory`
import { Eye, EyeOff, Compass } from 'lucide-react';
import axios from '../config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use `useNavigate` here

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match",
      { 
        position: "Center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Set loading state to true to indicate submission is in progress
    setLoading(true);

    try {
      // Send request to backend API to register the user
      const response = await axios.post('/api/auth/register', {
        name: formData.fullName,  // Change from 'fullName' to 'name' to match backend schema
        email: formData.email,
        password: formData.password
      });

      // Show success notification
      toast.success("Account created! Please verify your email.");

      // Redirect user to the OTP verification page after successful registration
      navigate('/verify-otp', { 
        state: { 
          userData: response.data.user 
        } 
      });
    } catch (error) {
      // Handle errors
      if (error.response) {
        // If server responds with an error, show the message
        toast.error(error.response.data.message || "Registration failed. Please try again.",
        { 
          position: "Center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // If no response from the server, show a network error
        toast.error("Network error. Please try again.",
        { 
          position: "center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-yellow-100 dark:border-gray-700">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center space-x-2 group">
            <Compass className="w-8 h-8 text-yellow-400 group-hover:rotate-[360deg] transition-transform duration-500" />
            <span className="text-2xl font-bold">
              Roam<span className="text-yellow-400">Mate</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => {navigate('/login')}} className="text-yellow-400 hover:text-yellow-500 font-medium">
              Sign in
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 
                         rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 
                         focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 
                         rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 
                         focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 
                           rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 
                           focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="block w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-700 
                           rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 
                           focus:border-yellow-400 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                       shadow-lg text-sm font-medium text-black bg-yellow-400
                       hover:bg-yellow-500 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
