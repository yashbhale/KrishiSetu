import { exec } from 'child_process';
import { connectDB } from '@/app/lib/mongodb';
import Price from '@/app/models/Price';
import path from 'path';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // Save to DB
    const price = await Price.create(body);

    // Corrected path to the whatsappSender.mjs script in the utils folder
    const whatsappSenderPath = path.resolve(process.cwd(), 'test-whatsapp.mjs');

    // Execute the script (no arguments needed)
    exec(`node ${whatsappSenderPath}`, (error, stdout, stderr) => {
      if (error) console.error('WhatsApp Error:', error);
      if (stderr) console.error('stderr:', stderr);
      if (stdout) console.log('stdout:', stdout);
    });

    return new Response(
      JSON.stringify({ message: 'Price entry added & message sent!', price }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Failed to save price', error: err.message }),
      { status: 500 }
    );
  }
}

export function GET() {
  return new Response('GET not implemented for this route', { status: 405 });
}
