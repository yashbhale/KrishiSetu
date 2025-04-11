'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch('/api/company-auth/session');
        if (!res.ok) throw new Error('Unauthorized or session error');
        const data = await res.json();
        console.log(data);
        setUser(data.user);
      } catch (err) {
        console.error('Session error:', err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  if (loading) return <p className="text-center p-6 text-gray-600">Loading...</p>;

  if (!user) return <p className="text-center p-6 text-red-600">You are not logged in.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow text-center space-y-2">
        <h2 className="text-2xl font-bold text-green-700">Welcome, {user.username}</h2>
        <p className="text-gray-700">Email: {user.email}</p>
        <p className="text-gray-700">Contact: {user.contact}</p>
      </div>
    </div>
  );
}