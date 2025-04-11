'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/app/components/Navbar';
import PageVoiceAssistant from '@/app/components/PageVoiceAssistant';

export default function LogisticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/company/logistics');
        console.log(res);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const totalBuy = Array.isArray(data?.buys)
    ? data.buys.reduce((sum, item) => sum + item.amount, 0)
    : 0;

  const totalSell = Array.isArray(data?.sells)
    ? data.sells.reduce((sum, item) => sum + item.amount, 0)
    : 0;

  return (
    <>
    <Navbar />
    <PageVoiceAssistant audioFile="logistics.mp3" />
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-green-700">
        Company Logistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg p-4">
          <CardContent>
            <h2 className="text-xl font-semibold text-green-600 mb-2">Total Crop Buy</h2>
            <p className="text-3xl font-bold text-gray-800">₹ {totalBuy}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg p-4">
          <CardContent>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Total Products Sold</h2>
            <p className="text-3xl font-bold text-gray-800">₹ {totalSell}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Buy vs Sell Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: 'Buy', amount: totalBuy },
              { name: 'Sell', amount: totalSell },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow p-4">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Detailed Crop Buys</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {Array.isArray(data?.buys) && data.buys.map((item, idx) => (
                <li key={idx} className="border-b pb-1">
                  {item.crop} - ₹{item.amount} (Farmer: {item.farmer})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow p-4">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Detailed Product Sells</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {Array.isArray(data?.sells) && data.sells.map((item, idx) => (
                <li key={idx} className="border-b pb-1">
                  {item.product} - ₹{item.amount} (To: {item.farmer})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
