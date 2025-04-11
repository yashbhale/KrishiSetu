'use client';
import React, { useState } from 'react';

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <nav className="bg-green-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">🌾 KrishiSetu</div>

        {/* Links */}
        

        {/* Login Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLoginOpen(!loginOpen)}
            className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Login ▼
          </button>
          {loginOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-green-800 rounded-lg shadow-lg z-10">
              <a
                href="/authentication/user-auth/login"
                className="block px-4 py-2 hover:bg-green-100 rounded-t-lg"
              >
                Farmer Login
              </a>
              <a
                href="/authentication/company-auth/login"
                className="block px-4 py-2 hover:bg-green-100 rounded-b-lg"
              >
                Company Login
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
