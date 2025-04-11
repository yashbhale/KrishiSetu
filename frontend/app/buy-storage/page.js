'use client';

import { useState, useEffect } from 'react';

export default function BuyStoragePage() {
  const [search, setSearch] = useState('');
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const res = await fetch('/api/get-storage');
        const data = await res.json();
        setStorages(data);
      } catch (err) {
        console.error('Failed to load storage data:', err);
      }
    };

    fetchStorage();
  }, []);

  const filtered = storages.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🔍 Available Storages</h1>

      <input
        type="text"
        placeholder="Search by location..."
        className="w-full p-2 border rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => (
          <div key={item._id} className="p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-semibold text-green-800">{item.location}</h2>
            <p>📦 Capacity: {item.capacity} tons</p>
            <p>💰 Price: ₹{item.price}/month</p>
            <p>📞 Contact: {item.contact}</p>
            <p>📝 {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
