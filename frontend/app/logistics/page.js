'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Warehouse, Store, Truck, UploadCloud } from 'lucide-react'; // Optional icons

export default function LogisticsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10 text-center">
                {/* <h1 className="text-4xl font-bold text-green-700 mb-4">Logistics Portal</h1> */}
                <p className="text-gray-700 mb-10 text-lg">
                    Manage logistics with ease — explore, buy, or post vehicle and storage solutions.
                </p>



                {/* Image Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="rounded-xl overflow-hidden shadow-xl bg-white transition-transform hover:scale-105">
                        <img
                            src="https://caraxiaselfdrive.com/wp-content/uploads/2023/12/7197355-1024x683.jpg"
                            alt="Vehicle Logistics"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-5 text-left">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Vehicle Logistics</h2>
                            <p className="text-gray-600">
                                Browse or post transport vehicles for delivery and supply chain needs. Verified listings and secure transactions.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-xl bg-white transition-transform hover:scale-105">
                        <img
                            src="https://safestorage.in/assets/new_design_css/img/about/about-1.png"
                            alt="Storage Solutions"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-5 text-left">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Storage Solutions</h2>
                            <p className="text-gray-600">
                                Find reliable storage spaces for rent or list your own. Safe, spacious, and flexible storage options available.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 mt-20">
                    <Link href="/buy-storage" className="flex flex-col items-center justify-center bg-gray-600 hover:bg-green-700 text-white py-6 px-4 rounded-2xl text-lg font-medium shadow-md transition h-32">
                        <Warehouse className="w-6 h-6 mb-2" />
                        Buy Storage
                    </Link>
                    <Link href="/post-storage" className="flex flex-col items-center justify-center bg-gray-600 hover:bg-blue-700 text-white py-6 px-4 rounded-2xl text-lg font-medium shadow-md transition h-32">
                        <Store className="w-6 h-6 mb-2" />
                        Sell Storage
                    </Link>
                    <Link href="/buy-vehical" className="flex flex-col items-center justify-center bg-gray-600 hover:bg-orange-700 text-white py-6 px-4 rounded-2xl text-lg font-medium shadow-md transition h-32">
                        <Truck className="w-6 h-6 mb-2" />
                        Buy Vehicle
                    </Link>
                    <Link href="/post-vehical" className="flex flex-col items-center justify-center bg-gray-600 hover:bg-red-700 text-white py-6 px-4 rounded-2xl text-lg font-medium shadow-md transition h-32">
                        <UploadCloud className="w-6 h-6 mb-2" />
                        Sell Vehicle
                    </Link>
                </div>
            </div>
        </div>
    );
}
