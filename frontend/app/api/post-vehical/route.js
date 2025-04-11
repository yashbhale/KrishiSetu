import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Vehicle from "@/app/models/Vehical";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const vehicle = new Vehicle(body);
    await vehicle.save();
    return NextResponse.json({ message: "Vehicle saved" });
  } catch (error) {
    return NextResponse.json({ message: "Error saving vehicle" }, { status: 500 });
  }
}
