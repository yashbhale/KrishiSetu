'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <button className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
}