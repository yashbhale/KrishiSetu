'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/company-auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard1');
    } else {
      try {
        const data = await res.json();
        alert(data.message || 'Login failed');
      } catch {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-purple-600">Login</h1>
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Login</button>
        <p className="text-sm text-center">Don't have an account? <a href="/authentication/company-auth/register" className="text-purple-500 underline">Register</a></p>
      </form>
    </div>
  );
}
