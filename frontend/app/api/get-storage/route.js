import { connectDB } from '@/app/lib/mongodb';
import Storage from '@/app/models/Storage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const storages = await Storage.find().sort({ createdAt: -1 });
    return NextResponse.json(storages);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching storage data' }, { status: 500 });
  }
}