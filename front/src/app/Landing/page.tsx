'use client';
import React, { useState } from 'react';
import { FiCheck, FiArrowRight, FiMail, FiUsers, FiActivity, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '../components/NavBar';

const FitnessLanding = () => {
  const [email, setEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState('tracking');

  // Core features data
  const features = [
    {
      id: 'tracking',
      title: 'AI-Powered Nutrition Tracking',
      description: 'Simply snap a photo of your meal and our AI instantly calculates calories and macros',
      icon: <FiActivity className="text-amber-500 text-2xl" />,
      cta: 'Try Food Scan'
    },
    {
      id: 'workouts',
      title: 'Personalized Workout Plans',
      description: 'Get custom workouts that adapt to your progress and equipment availability',
      icon: <FiHeart className="text-amber-500 text-2xl" />,
      cta: 'See Sample Workout'
    },
    {
      id: 'coaching',
      title: 'Real-Time Trainer Support',
      description: 'Get instant feedback from certified coaches via in-app messaging',
      icon: <FiUsers className="text-amber-500 text-2xl" />,
      cta: 'Meet Our Trainers'
    }
  ];

  const currentFeature = features.find(f => f.id === activeFeature) || features[0];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-white py-12 px-6 shadow-sm">
        <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-amber-600 flex items-center">
            <span className="mr-2">🏋️</span> Smart Gym
          </div>
          <Link href="/login" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-all">
            Sign In
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Your <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">AI Fitness Coach</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track calories, follow personalized workouts, and get real-time coaching - all powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap shadow-md transition-all">
                Get Early Access
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl rotate-2"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-amber-100">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 h-64 rounded-xl flex items-center justify-center text-white text-lg font-medium">
                App Preview
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Core Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our AI-powered tools adapt to your unique fitness journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all border ${activeFeature === feature.id ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-md' : 'bg-white border-gray-100 hover:border-amber-100 hover:shadow-sm'}`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button className="text-amber-600 font-medium hover:text-orange-600 flex items-center">
                  {feature.cta} <FiArrowRight className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Focus */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">AI Nutrition</span> Scanner
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Just take a picture of your food and get instant calorie and nutrition analysis. No more manual logging.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Identifies 10,000+ foods with 95% accuracy",
                "Tracks macros and micronutrients",
                "Learns your eating habits over time"
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-amber-500 mr-2 mt-1"><FiCheck /></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all">
              See How It Works
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl -rotate-2"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-amber-100">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 h-64 rounded-xl flex items-center justify-center text-white text-lg font-medium">
                Nutrition Scanner Demo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Trusted by <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join our community of fitness enthusiasts
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The AI food scanner changed everything for me. I've lost 15kg in 3 months!",
              name: "Sarah K.",
              role: "Verified User"
            },
            {
              quote: "Finally a workout plan that adapts to my schedule and equipment.",
              name: "Michael T.",
              role: "Fitness Coach"
            },
            {
              quote: "The real-time coaching is like having a personal trainer in my pocket.",
              name: "David L.",
              role: "Marathon Runner"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-b from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <div className="text-amber-500 text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Join thousands who've already seen real results with our AI-powered approach
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-md transition-all">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-bold text-lg transition-all">
              See Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🏋️</span> Smart Gym
            </h3>
            <p className="text-gray-400">
              The future of personalized fitness powered by artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Download</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} Smart Gym. All rights reserved.
        </div>
      </footer>
    </div>
    </>
  );
};

export default FitnessLanding;