import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET || 'secret';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
