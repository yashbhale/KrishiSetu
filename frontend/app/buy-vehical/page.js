'use client';

import { useState, useEffect } from 'react';

export default function BuyVehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await fetch('/api/get-vehical/');
      const data = await res.json();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const filtered = vehicles.filter((v) =>
    v.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🚛 Available Vehicles</h1>

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
            <h2 className="text-lg font-semibold text-green-800">{item.type} - {item.location}</h2>
            <p>⚖️ Capacity: {item.capacity} tons</p>
            <p>💰 Price: ₹{item.price}/trip</p>
            <p>📞 Contact: {item.contact}</p>
            <p>📝 {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
