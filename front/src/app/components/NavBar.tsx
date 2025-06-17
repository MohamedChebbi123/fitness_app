'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHome, FiActivity, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center">
              <GiWeightLiftingUp className="h-6 w-6 mr-2" />
              Smart Gym
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 flex items-center transition-colors"
            >
              <FiHome className="mr-1" /> Home
            </Link>
            <Link 
              href="/weight" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 flex items-center transition-colors"
            >
              <FiActivity className="mr-1" /> Weight Tracker
            </Link>
            <Link 
              href="/Profile" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 flex items-center transition-colors"
            >
              <FiUser className="mr-1" /> Profile
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            ) : (
              <Link 
                href="/login" 
                className="ml-4 px-4 py-2 bg-white text-amber-700 hover:bg-white/90 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <FiLogIn className="mr-1" /> Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-amber-500/20 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-700/90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHome className="mr-2" /> Home
            </Link>
            <Link 
              href="/weight" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiActivity className="mr-2" /> Weight Tracker
            </Link>
            <Link 
              href="/Profile" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="mr-2" /> Profile
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 flex items-center"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            ) : (
              <Link 
                href="/login" 
                className="block px-3 py-2 bg-white text-amber-700 rounded-md text-base font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiLogIn className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;