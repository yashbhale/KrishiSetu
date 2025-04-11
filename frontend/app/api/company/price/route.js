import { connectDB } from '@/app/lib/mongodb';
import Price from '@/app/models/Price';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const price = await Price.create(body);

    return new Response(JSON.stringify({ message: 'Price entry added!', price }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to save price', error: err.message }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response('GET not implemented for this route', { status: 405 });
}
