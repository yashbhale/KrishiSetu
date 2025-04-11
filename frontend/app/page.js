// src/pages/Homepage.jsx

import React from 'react';
import { Tractor, ShoppingCart, DollarSign, BarChart, MapPin, TrendingUp } from "lucide-react";
import Navbar from './components/Navbar';

const features = [
  {
    title: "Buy Crop",
    icon: <ShoppingCart className="w-8 h-8 text-green-700" />,
    desc: "Browse and purchase fresh crops directly from farmers.",
  },
  {
    title: "Sell Crop",
    icon: <Tractor className="w-8 h-8 text-green-700" />,
    desc: "List your crops and connect with buyers instantly.",
  },
  {
    title: "Plan Budget",
    icon: <DollarSign className="w-8 h-8 text-green-700" />,
    desc: "Manage your farming budget and predict future expenses.",
  },
  {
    title: "Check Price",
    icon: <BarChart className="w-8 h-8 text-green-700" />,
    desc: "Get real-time crop price estimation based on market trends.",
  },
  {
    title: "Logistics",
    icon: <MapPin className="w-8 h-8 text-green-700" />,
    desc: "Access transport options to move crops efficiently.",
  },
  {
    title: "Market Insights",
    icon: <TrendingUp className="w-8 h-8 text-green-700" />,
    desc: "Analyze trends and insights to maximize profit.",
  },
];

export default function Homepage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800">Welcome to KrishiSetu 🌾</h1>
        <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
          Empowering Farmers & Buyers with tools to sell, buy, plan, and grow smarter — now with Voice Assistant!
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-green-800">{feature.title}</h2>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
            <button
              className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              Go to {feature.title}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
