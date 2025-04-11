// src/pages/Homepage.jsx

'use client';
import React from 'react';
import Link from 'next/link';
import { Tractor, ShoppingCart, DollarSign, BarChart, MapPin, TrendingUp } from "lucide-react";
import Navbar from './components/Navbar';

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
          {/* Buy Crop */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <ShoppingCart className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Buy Crop</h2>
            <p className="text-gray-600 mt-2">Browse and purchase fresh crops directly from farmers.</p>
            <Link href="/user/buycrop">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Buy Crop
              </button>
            </Link>
          </div>

          {/* Sell Crop */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <Tractor className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Sell Crop</h2>
            <p className="text-gray-600 mt-2">List your crops and connect with buyers instantly.</p>
            <Link href="/user/sellcrop">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Sell Crop
              </button>
            </Link>
          </div>

          {/* Plan Budget */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <DollarSign className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Plan Budget</h2>
            <p className="text-gray-600 mt-2">Manage your farming budget and predict future expenses.</p>
            <Link href="/plan-budget">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Plan Budget
              </button>
            </Link>
          </div>

          {/* Check Price */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <BarChart className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Check Price</h2>
            <p className="text-gray-600 mt-2">Get real-time crop price estimation based on market trends.</p>
            <Link href="/check-price">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Check Price
              </button>
            </Link>
          </div>

          {/* Logistics */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <MapPin className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Logistics</h2>
            <p className="text-gray-600 mt-2">Access transport options to move crops efficiently.</p>
            <Link href="/logistics">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Logistics
              </button>
            </Link>
          </div>

          {/* Market Insights */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="mb-4">
              <TrendingUp className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Market Insights</h2>
            <p className="text-gray-600 mt-2">Analyze trends and insights to maximize profit.</p>
            <Link href="/market-insights">
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition">
                Go to Market Insights
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
