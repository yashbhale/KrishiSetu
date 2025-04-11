'use client';
import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';

export default function MandiForm() {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    market: '',
    commodity: '',
    variety: '',
    grade: '',
    min_price: '',
    max_price: '',
    modal_price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

    const fullData = {
      ...formData,
      date: today,
    };

    try {
      const res = await fetch('/api/company/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });
      const data = await res.json();
      alert(data.message || 'Submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
        <h1 className="text-3xl text-center font-bold text-green-800 mb-8">
          Mandi Crop Price Entry 🌾
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          {[
            ['State', 'state'],
            ['District', 'district'],
            ['Market', 'market'],
            ['Commodity', 'commodity'],
            ['Variety', 'variety'],
            ['Grade', 'grade'],
            ['Minimum Price', 'min_price'],
            ['Maximum Price', 'max_price'],
            ['Modal Price', 'modal_price'],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-green-800 font-semibold mb-2">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition"
          >
            Submit Crop Price
          </button>
        </form>
      </div>
    </>
  );
}
