'use client';

import { useState, useEffect } from 'react';
import { Warehouse, Phone, FileText, IndianRupee, Boxes } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-8 flex items-center gap-2">
        <Warehouse className="w-8 h-8" /> Available Storages
      </h1>

      <input
        type="text"
        placeholder="Search by location..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item._id} className="p-6 bg-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-green-800 mb-3">{item.location}</h2>

            <div className="text-gray-700 space-y-2 text-[15px]">
              <p className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-green-500" /> Capacity: {item.capacity} tons
              </p>
              <p className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-500" /> Price: ₹{item.price}/month
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-500" /> Contact: {item.contact}
              </p>
              <p className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" /> {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
