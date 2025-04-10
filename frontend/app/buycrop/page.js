import React from 'react';
import Navbar from '../components/Navbar';

const page = () => {
  const crops = [
    { id: 1, name: 'Wheat', price: '$20', image: '/wheat.png', description: 'High-quality wheat for all your needs.', location: 'Punjab', availability: '500kg' },
    { id: 2, name: 'Rice', price: '$25', image: '/rice.png', description: 'Premium rice with excellent taste.', location: 'Haryana', availability: '300kg' },
    { id: 3, name: 'Corn', price: '$15', image: '/corn.png', description: 'Fresh and organic corn.', location: 'Madhya Pradesh', availability: '400kg' },
    { id: 4, name: 'Barley', price: '$18', image: '/barley.png', description: 'Nutritious barley for healthy meals.', location: 'Rajasthan', availability: '250kg' },
    { id: 5, name: 'Soybean', price: '$22', image: '/wheat.png', description: 'Rich in protein and nutrients.', location: 'Maharashtra', availability: '350kg' },
    { id: 6, name: 'Sugarcane', price: '$30', image: '/barley.png', description: 'Fresh sugarcane for sweet delights.', location: 'Uttar Pradesh', availability: '600kg' },
    { id: 7, name: 'Millet', price: '$12', image: '/wheat.png', description: 'Healthy and organic millet.', location: 'Gujarat', availability: '200kg' },
    { id: 8, name: 'Lentils', price: '$28', image: '/rice.png', description: 'Premium quality lentils.', location: 'Bihar', availability: '450kg' },
    { id: 9, name: 'Peanuts', price: '$10', image: '/corn.png', description: 'Crunchy and fresh peanuts.', location: 'Tamil Nadu', availability: '500kg' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-12 drop-shadow-md">🌾 Buy Fresh Crops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl hover:scale-[1.03] transition-all duration-300 p-5 border border-green-200"
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
              />
              <h2 className="text-2xl font-bold text-green-800 mb-2">{crop.name}</h2>
              <p className="text-gray-700 mb-2">{crop.description}</p>
              <div className="text-sm text-gray-500 mb-1">📍 {crop.location}</div>
              <div className="text-sm text-gray-500 mb-2">📦 {crop.availability}</div>
              <p className="text-xl font-semibold text-green-700 mb-4">{crop.price}</p>
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

export default page;
