'use client';

import { useState } from 'react';

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
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Vehicle listed successfully');
      setFormData({
        location: '',
        type: '',
        capacity: '',
        price: '',
        contact: '',
        description: '',
      });
    } else {
      alert('Failed to list vehicle');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">🚚 Post Your Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="location" placeholder="Location" className="w-full p-2 border rounded" onChange={handleChange} value={formData.location} required />
        <input name="type" placeholder="Vehicle Type (e.g. Truck)" className="w-full p-2 border rounded" onChange={handleChange} value={formData.type} required />
        <input name="capacity" placeholder="Capacity (in tons)" className="w-full p-2 border rounded" onChange={handleChange} value={formData.capacity} required />
        <input name="price" placeholder="Price per trip" className="w-full p-2 border rounded" onChange={handleChange} value={formData.price} required />
        <input name="contact" placeholder="Contact Number" className="w-full p-2 border rounded" onChange={handleChange} value={formData.contact} required />
        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" onChange={handleChange} value={formData.description}></textarea>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Post Vehicle</button>
      </form>
    </div>
  );
}
