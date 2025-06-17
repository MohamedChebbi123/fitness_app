'use client';
import React, { useState } from 'react';

const WeightPage: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('User not logged in');
      return;
    }
   
    try {
      const response = await fetch('http://localhost:8000/weight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wheight: parseFloat(weight) }), 
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Weight submitted successfully');
      } else {
        throw new Error(result.detail || 'Submission failed');
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Weight</h2>
        {message && (
          <div className="text-center mb-4">{message}</div>
        )}
        <input
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WeightPage;
