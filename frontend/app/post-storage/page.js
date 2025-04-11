'use client';

import { useState } from 'react';

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
      const res = await fetch('/api/post-storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📦 Post Your Storage</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-xl">
        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="capacity"
          placeholder="Capacity (in tons)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price (per month in ₹)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact Info"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Storage Details..."
          className="w-full p-2 border rounded"
          onChange={handleChange}
          rows="3"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
}
