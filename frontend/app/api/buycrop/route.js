import { connectDB } from '@/app/lib/mongodb';
import Crop from '@/app/models/Crop.model.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const crops = await Crop.find().populate('sellerId', 'username').sort({ createdAt: -1 }); // You can also populate the sellerId field to include user info if needed
    console.log("Crops fetched successfully:", crops);
    return NextResponse.json({ crops }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch crops', error: err.message }, { status: 500 });
  }
}
