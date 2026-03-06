'use client';

import { useState } from 'react';
import { Languages, Warehouse } from 'lucide-react';

export default function PostStoragePage() {
  const [form, setForm] = useState({
    location: '',
    capacity: '',
    price: '',
    contact: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigator.geolocation.getCurrentPosition((pos)=>{
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
})
      const res = await fetch('/api/post-storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form,lat,lng),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Posted successfully!');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 flex items-center justify-center gap-3">
        <Warehouse className="w-8 h-8" />
        Post Your Storage
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-2xl shadow-2xl">
        <input
          name="location"
          placeholder="📍 Location"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <input
          name="capacity"
          placeholder="📦 Capacity (in tons)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="💰 Price (₹/month)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="📞 Contact Info"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="📝 Storage Details..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
