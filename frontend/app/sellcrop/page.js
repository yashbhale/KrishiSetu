'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const crops = [
  { id: 1, name: 'Wheat' },
  { id: 2, name: 'Rice' },
  { id: 3, name: 'Corn' },
  { id: 4, name: 'Barley' },
  { id: 5, name: 'Soybean' },
  { id: 6, name: 'Sugarcane' },
  { id: 7, name: 'Millet' },
  { id: 8, name: 'Lentils' },
  { id: 9, name: 'Peanuts' },
];

const SellCropPage = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 transition-all duration-500">
          <h1 className="text-5xl font-bold text-center text-green-700 mb-4">🌾 Sell Your Crop</h1>
          <p className="text-center text-gray-600 text-lg mb-10">
            List your fresh produce in local mandis and connect with interested buyers.
          </p>

          <form className="space-y-8">
            {/* Crop Dropdown */}
            <div className="relative">
              <label htmlFor="crop" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Crop
              </label>
              <select
                name="crop"
                id="crop"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Choose a Crop --</option>
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (kg)</label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 200"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Price (₹/kg)</label>
                <input
                  type="number"
                  name="price"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 25"
                />
              </div>
            </div>

            {/* Mandi Location */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Choose Mandi</label>
              <select
                name="mandi"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Select Mandi --</option>
                <option>Amritsar Mandi</option>
                <option>Delhi Azadpur</option>
                <option>Lucknow Mandi</option>
                <option>Mumbai APMC</option>
              </select>
            </div>

            {/* Harvest Date */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Harvest Date</label>
              <input
                type="date"
                name="harvestDate"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Description</label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Describe the crop quality, fertilizer used, etc."
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Crop Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 rounded-xl w-full max-h-64 object-cover shadow-lg border"
                />
              )}
            </div>

            {/* Contact */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. 9876543210"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
              >
                ✅ Submit Crop for Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellCropPage;
