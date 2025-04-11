'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/app/components/Navbar';
import PageVoiceAssistant from '@/app/components/PageVoiceAssistant';

export default function MarketStatsPage() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [commodity, setCommodity] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mandiSearch, setMandiSearch] = useState('');

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/farmer/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, district, commodity }),
      });

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }

    setLoading(false);
  };

  const todaysData = data.filter((item) => {
    const itemDate = new Date(item.date).toLocaleDateString('en-CA', {
      timeZone: 'Asia/Kolkata',
    });
    return itemDate === today;
  });

  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-CA', {
      timeZone: 'Asia/Kolkata',
    }),
    modal_price: item.modal_price,
  }));

  const filteredTodaysData = useMemo(() => {
    return todaysData.filter((item) =>
      item.market.toLowerCase().includes(mandiSearch.toLowerCase())
    );
  }, [mandiSearch, todaysData]);

  return (
    <>
      <Navbar />
      <PageVoiceAssistant audioFile="checkprice.mp3" />
      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        <Card className="bg-white shadow-xl border-0 rounded-lg">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="text-3xl font-bold text-green-900 flex items-center gap-3">
              <span className="bg-green-600 text-white p-3 rounded-lg">📊</span>
              <div>
                <h1>Agricultural Market Analytics</h1>
                <p className="text-sm text-green-600 font-normal mt-1">
                  Real-time Commodity Pricing Trends
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">State</label>
                <Input
                  className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 shadow-sm"
                  placeholder="e.g., Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">District</label>
                <Input
                  className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 shadow-sm"
                  placeholder="e.g., Nashik"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Commodity</label>
                <Input
                  className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 shadow-sm"
                  placeholder="e.g., Onion"
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <Input
                  type="date"
                  className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 shadow-sm"
                  value={today}
                  disabled
                />
              </div>

              <Button
                type="submit"
                className="h-[42px] bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white shadow-md transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Market'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {todaysData.length > 0 && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-green-50 border-b space-y-2">
              <CardTitle className="text-xl font-semibold text-green-800">
                Today's Market Rates ({new Date(today).toLocaleDateString()})
              </CardTitle>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Filter by Mandi:</label>
                <Input
                  type="text"
                  placeholder="e.g. Nagpur"
                  value={mandiSearch}
                  onChange={(e) => setMandiSearch(e.target.value)}
                  className="w-52 h-9 text-sm border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-full whitespace-nowrap scrollbar-thin scrollbar-thumb-green-400">
                  {filteredTodaysData.length > 0 ? (
                    filteredTodaysData.map((item, index) => (
                      <div
                        key={index}
                        className="min-w-[250px] max-w-[250px] bg-white border shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 ease-in-out flex-shrink-0"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-green-700 font-bold text-lg">
                            {item.market}
                          </h3>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {item.variety}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Grade:</strong> {item.grade}
                        </p>

                        <div className="flex justify-between mt-3 text-sm font-medium">
                          <div className="text-red-600">
                            <div className="text-xs text-gray-500">Min</div>
                            ₹{item.min_price}
                          </div>
                          <div className="text-green-600">
                            <div className="text-xs text-gray-500">Max</div>
                            ₹{item.max_price}
                          </div>
                          <div className="text-green-800">
                            <div className="text-xs text-gray-500">Modal</div>
                            ₹{item.modal_price}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 px-4 mt-4">
                      No entries found for the selected mandi.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {chartData.length > 0 && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-green-50 border-b">
              <CardTitle className="text-xl font-semibold text-green-800">
                Price Trend Analysis (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis
                      dataKey="date"
                      tick={false}
                      axisLine={false}
                      label={{
                        value: 'Date',
                        position: 'insideBottom',
                        offset: -5,
                        fill: '#065f46',
                      }}
                    />
                    <YAxis
                      tick={{ fill: '#065f46' }}
                      label={{
                        value: 'Price (₹)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 3,
                        fill: '#065f46',
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #d1fae5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="modal_price"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#16a34a' }}
                      activeDot={{ r: 8 }}
                      animationDuration={400}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
        )}
      </div>
    </>
  );
}
