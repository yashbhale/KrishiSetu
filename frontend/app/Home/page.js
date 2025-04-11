// pages/index.js
'use client'

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [activeTab, setActiveTab] = useState('farmers');

  const features = {
    farmers: [
      { title: 'Crop Advisory', description: 'Get expert advice for your crops', icon: '🌱' },
      { title: 'Market Prices', description: 'Real-time market rates for your produce', icon: '💹' },
      { title: 'Weather Forecasts', description: 'Accurate weather predictions for planning', icon: '🌦️' },
      { title: 'Connect with Buyers', description: 'Sell directly to buyers without middlemen', icon: '🤝' }
    ],
    businesses: [
      { title: 'Source Quality Produce', description: 'Connect directly with farmers', icon: '🥕' },
      { title: 'Supply Chain Management', description: 'Streamline your agricultural supply chain', icon: '🔄' },
      { title: 'Bulk Orders', description: 'Place large orders with verified farmers', icon: '📦' },
      { title: 'Quality Assurance', description: 'Get certified quality farm products', icon: '✅' }
    ],
    experts: [
      { title: 'Knowledge Sharing', description: 'Share your expertise with farmers', icon: '📚' },
      { title: 'Consulting Opportunities', description: 'Offer paid consulting services', icon: '💼' },
      { title: 'Research Collaboration', description: 'Connect with research institutions', icon: '🔬' },
      { title: 'Community Building', description: 'Build your network in agriculture', icon: '👥' }
    ]
  };

  const testimonials = [
    { name: 'Ramesh Singh', role: 'Farmer, Punjab', text: 'KrishiSetu helped me get 20% better prices for my wheat crop this season!' },
    { name: 'Priya Verma', role: 'Agri-Business Owner', text: 'Sourcing quality produce has never been easier. The platform is transforming how we do business.' },
    { name: 'Dr. Sharma', role: 'Agricultural Expert', text: 'I can now reach thousands of farmers with critical knowledge that improves their yields and income.' }
  ];

  return (
    <div>
      <Head>
        <title>KrishiSetu - Bridging Farmers to Success</title>
        <meta name="description" content="Connecting farmers with buyers, experts and technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering India's Farmers</h1>
              <p className="text-xl mb-6">Connect directly with buyers, access expert advice, and leverage technology to increase your farm income</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/register" className="px-6 py-3 bg-white text-green-600 font-semibold rounded-md text-center hover:bg-green-100 transition">Get Started</Link>
                <Link href="#how-it-works" className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md text-center hover:bg-green-800 transition">Learn More</Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md h-80 bg-gray-400 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
                  <img src="https://miro.medium.com/v2/resize:fit:1400/0*3iWHPZlDGbq7U0_J.jpeg" alt="Hero Image" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How KrishiSetu Helps You</h2>
            
            <div className="flex flex-wrap mb-8 justify-center">
              {['farmers', 'businesses', 'experts'].map(type => (
                <button 
                  key={type}
                  className={`px-5 py-2 mx-2 mb-4 rounded-full ${activeTab === type ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setActiveTab(type)}
                >
                  For {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features[activeTab].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: 1, title: 'Register on KrishiSetu', description: 'Create your profile as a farmer, business, or agricultural expert' },
                { step: 2, title: 'Connect & Engage', description: 'Find buyers, access expert advice, or offer your services' },
                { step: 3, title: 'Grow & Prosper', description: 'Increase your income, expand your business, or share your expertise' },
              ].map((item, idx) => (
                <div className="text-center" key={idx}>
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download App */}
        <section id="download" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Download the KrishiSetu App</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Get access to all features on the go. Available for Android and iOS devices.</p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition">
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition">
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-xl font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">KrishiSetu</h3>
          <p className="mb-4">Empowering Indian agriculture through technology and collaboration.</p>
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} KrishiSetu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
