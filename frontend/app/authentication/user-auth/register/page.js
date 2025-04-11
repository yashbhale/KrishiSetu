'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
    confirm: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return alert("Passwords don't match");
    }
  
    const res = await fetch('/api/user-auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  
    let data = {};
    try {
      data = await res.json(); // This will fail if response body is empty
    } catch (err) {
      console.error("Failed to parse JSON response:", err);
    }
  
    if (res.ok) {
      router.push('/authentication/user-auth/login');
    } else {
      alert(data.message || 'Registration failed');
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4 pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl border border-gray-200 p-8 rounded-2xl w-full max-w-md space-y-5"
        >
          <h1 className="text-3xl font-bold text-center text-green-800">Farmer Register</h1>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact</label>
            <input
              type="text"
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition font-semibold"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/authentication/user-auth/login" className="text-green-700 font-medium underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
