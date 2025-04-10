'use client';
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', contact: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, contact, password, confirmPassword } = form;

    if (!username || !email || !contact || !password || !confirmPassword) return alert("All fields required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Invalid email");
    if (password.length < 8) return alert("Password too short");
    if (password !== confirmPassword) return alert("Passwords do not match");

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, contact, password })
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input name="username" placeholder="Username" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <input name="email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <input name="contact" placeholder="Contact" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="mb-2 p-2 border w-full" />
      <button className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}