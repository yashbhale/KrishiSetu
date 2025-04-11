import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Company from "@/app/models/Company";

export async function POST(req) {
  await connectDB();
  const { username, email, contact, password } = await req.json();

  const existingUser = await Company.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Company({ username, email, contact, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}