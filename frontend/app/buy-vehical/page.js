'use client';

import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 flex items-center gap-3">
        <Truck className="w-8 h-8" />
        Available Vehicles
      </h1>

      <input
        type="text"
        placeholder="🔍 Search by location..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item._id} className="p-5 bg-gray-100 border rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              🚛 {item.type} - {item.location}
            </h2>
            <p>⚖️ Capacity: {item.capacity} tons</p>
            <p>💰 Price: ₹{item.price}/trip</p>
            <p>📞 Contact: {item.contact}</p>
            <p className="text-sm text-gray-600 mt-2">📝 {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
