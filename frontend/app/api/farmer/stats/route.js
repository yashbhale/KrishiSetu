// /app/api/market-data/route.js

import { connectDB } from '@/app/lib/mongodb';
import Price from '@/app/models/Price'; //ake sure this matches your model file

export async function POST(request) {
  const { state, district, commodity } = await request.json();

  try {
    await connectDB();

    const result = await Price.find({
      state: { $regex: `^${state}$`, $options: 'i' },
      district: { $regex: `^${district}$`, $options: 'i' },
      commodity: { $regex: `^${commodity}$`, $options: 'i' },
    });

    return Response.json(result);
  } catch (err) {
    console.error('Error fetching real data:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}