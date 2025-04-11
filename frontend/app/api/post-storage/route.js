import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Storage from '@/app/models/Storage';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const storage = new Storage(body);
    await storage.save();

    return NextResponse.json({ message: "Storage posted successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ message: "Error posting storage" }, { status: 500 });
  }
}
