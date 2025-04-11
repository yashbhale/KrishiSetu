import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold">🌾KrisiSetu</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="/abouti" className="hover:text-gray-400">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
          </li>
        </ul>
        </nav>
    </div>
  )
}

export default Navbar
