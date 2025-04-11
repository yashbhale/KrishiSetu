import { connectDB } from '@/app/lib/mongodb';
import Vehicle from '@/app/models/Vehical';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching vehicles' }, { status: 500 });
  }
}