'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', contact: '', password: '', confirm: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert("Passwords don't match");

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) router.push('/authentication/user-auth/login');
    else alert(data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">Register</h1>
        <input className="w-full p-2 border rounded" type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="w-full p-2 border rounded" type="text" placeholder="Contact" onChange={(e) => setForm({ ...form, contact: e.target.value })} required />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <input className="w-full p-2 border rounded" type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        <p className="text-sm text-center">Already have an account? <a href="/authentication/user-auth/login" className="text-blue-500 underline">Login</a></p>
      </form>
    </div>
  );
}
