'use client';

import { useState } from 'react';
import { Truck } from 'lucide-react';

export default function PostVehiclePage() {
  const [formData, setFormData] = useState({
    location: '',
    type: '',
    capacity: '',
    price: '',
    contact: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/post-vehical/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('✅ Vehicle listed successfully!');
      setFormData({
        location: '',
        type: '',
        capacity: '',
        price: '',
        contact: '',
        description: '',
      });
    } else {
      alert('❌ Failed to list vehicle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-700 mb-8 flex items-center justify-center gap-3">
          <Truck className="w-8 h-8" />
          Post Your Vehicle
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-5"
        >
          <input
            name="location"
            placeholder="📍 Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.location}
            required
          />
          <input
            name="type"
            placeholder="🚛 Vehicle Type (e.g. Truck)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.type}
            required
          />
          <input
            name="capacity"
            placeholder="⚖️ Capacity (in tons)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.capacity}
            required
          />
          <input
            name="price"
            placeholder="💰 Price per trip"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.price}
            required
          />
          <input
            name="contact"
            placeholder="📞 Contact Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.contact}
            required
          />
          <textarea
            name="description"
            placeholder="📝 Additional Description"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.description}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Post Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
