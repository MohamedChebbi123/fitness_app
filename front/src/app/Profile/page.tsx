'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

interface Profile {
  id: number;
  name: string;
  lastname: string;
  email: string;
  age?: number;  // Make optional if not always returned
  wheight: number;
  height: number;
  goal: string;
  password?: string; // Add password as optional
  activity_description?: string; // Add activity_description as optional
}

const ViewProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/viewprofile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Failed to fetch profile');
        }

        console.log('Fetched profile data:', data);
        setProfile(data);
        setFormData(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'wheight' || name === 'height' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/update_profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update profile');
      }

      setProfile(data);
      setSuccessMessage('Profile updated successfully!');
      setEditMode(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your fitness profile...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Profile Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-100">
          <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No profile data available</h3>
          <p className="mt-2 text-gray-600">We couldn't find any profile information for your account.</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg font-medium text-white shadow-sm hover:from-amber-500 hover:to-orange-600 transition-all"
            >
              Refresh Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {successMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl shadow-lg flex items-center animate-fade-in">
            <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="absolute -bottom-12 left-6">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-amber-300 to-amber-400 shadow-md flex items-center justify-center">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${editMode ? 'bg-gray-100 text-gray-700' : 'bg-white text-amber-600 shadow-sm'}`}
              >
                {editMode ? (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 px-6 pb-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name} {profile.lastname}</h1>
              <p className="text-gray-500">{profile.email}</p>
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fitness Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal">
                        Fitness Goal
                      </label>
                      <select
                        id="goal"
                        name="goal"
                        value={formData.goal || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all appearance-none"
                        required
                      >
                        <option value="">Select a goal</option>
                        <option value="weight_loss">Weight Loss</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="endurance">Endurance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="wheight">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          id="wheight"
                          name="wheight"
                          value={formData.wheight || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all pl-12"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">kg</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="height">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          id="height"
                          name="height"
                          value={formData.height || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all pl-12"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">cm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="activity_description">
                    Activity Level Description
                  </label>
                  <textarea
                    id="activity_description"
                    name="activity_description"
                    value={formData.activity_description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg font-medium text-white hover:from-amber-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-100 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-amber-100 rounded-xl mr-4">
                        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-800">Weight</p>
                        <p className="text-2xl font-bold text-gray-900">{profile.wheight} <span className="text-lg font-medium text-gray-500">kg</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-100 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 rounded-xl mr-4">
                        <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-orange-800">Height</p>
                        <p className="text-2xl font-bold text-gray-900">{profile.height} <span className="text-lg font-medium text-gray-500">cm</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border border-red-100 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-red-100 rounded-xl mr-4">
                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-800">Goal</p>
                        <p className="text-2xl font-bold text-gray-900 capitalize">{profile.goal}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-200 rounded-lg mr-3">
                      <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Activity Level</h3>
                  </div>
                  <p className="text-gray-700 pl-11">{profile.activity_description}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg font-medium text-white hover:from-amber-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all shadow-sm flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;