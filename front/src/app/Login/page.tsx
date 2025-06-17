'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn, FiLoader } from 'react-icons/fi';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.access_token);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/Landing"), 1500);
      } else {
        throw new Error(result.detail || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setMessage(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-100"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-md">
            <FiLogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your Smart Gym account</p>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg mb-6 text-center ${
              message.includes('successful') 
                ? 'bg-green-50 text-green-700 border border-green-100' 
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin h-5 w-5 mr-2" />
                  Logging in...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2 h-5 w-5" />
                  Log In
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link 
              href="/Register" 
              className="font-medium text-amber-600 hover:text-orange-600 hover:underline transition-colors"
            >
              Sign up now
            </Link>
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">
            <Link 
              href="/forgot-password" 
              className="font-medium text-gray-600 hover:text-gray-800 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;