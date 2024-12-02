import React, { useState } from 'react';
import { Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import image from '../../../assets/images';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    secretKey: '', // Additional admin secret key
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.secretKey) {
      newErrors.secretKey = 'Admin secret key is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call with additional admin validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setErrors({ auth: 'Invalid admin credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Logo and Header Section */}
        <div className="text-center mb-8">
          <div className="bg-black p-3 rounded-lg inline-block mb-6">
            <img 
              src=""
              alt="Admin Portal" 
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
              style={{ filter: 'invert(1) brightness(100)' }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Secure access for administrators only
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-black rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.auth && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
                {errors.auth}
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Admin email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-10 py-2.5 
                         text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500
                         transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-10 py-2.5 
                         text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500
                         transition-colors"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Admin Secret Key Input */}
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={formData.secretKey}
                onChange={(e) => setFormData({...formData, secretKey: e.target.value})}
                placeholder="Admin secret key"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-10 py-2.5 
                         text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500
                         transition-colors"
              />
              {errors.secretKey && (
                <p className="mt-1 text-sm text-red-500">{errors.secretKey}</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D97706] text-white py-2.5 px-4 rounded-lg font-medium
                       hover:bg-orange-600 transition-colors flex items-center justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'Admin Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Reset Password Link */}
            <p className="text-center text-sm text-gray-400">
              Forgot your password?{' '}
              <Link 
                to="/admin-reset-password" 
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                Reset Password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;