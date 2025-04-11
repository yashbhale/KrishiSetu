'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PageVoiceAssistant from '../../components/PageVoiceAssistant';

const BuyCropPage = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch('/api/buycrop');
        const data = await res.json();
        console.log("mmmmmmmmmmm", data);
        setCrops(data.crops);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCrops();
  }, []);

  return (
    <>
      <Navbar />
      <PageVoiceAssistant audioFile="buy-page.mp3" />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-12 drop-shadow-md">🌾 Buy Fresh Crops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {crops.map((crop) => (
            <div
              key={crop._id}
              className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl hover:scale-[1.03] transition-all duration-300 p-5 border border-green-200"
            >
              <img
                src={crop.imageurl || `/${crop.name}.png`}
                alt={crop.name}
                className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
              />
              <h2 className="text-2xl font-bold text-green-800 mb-2">{crop.name}</h2>
              <p className="text-gray-700 mb-2">{crop.description}</p>
              <div className="text-sm text-gray-500 mb-1">📍 {crop.location}</div>
              <div className="text-sm text-gray-500 mb-2">📦 {crop.quantity}kg</div>
              <p className="text-xl font-semibold text-green-700 mb-4">₹{crop.price}/kg</p>
              <button className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl font-semibold shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-200">
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyCropPage;
