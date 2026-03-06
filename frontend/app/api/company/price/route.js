import { exec } from "child_process";
import { connectDB } from "@/app/lib/mongodb";
import Price from "@/app/models/Price";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    const { commodity, state, district } = await req.json();

    // 1️⃣ Check cached price (last 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const cached = await Price.findOne({
      commodity,
      state,
      district,
      createdAt: { $gte: oneHourAgo }
    });

    if (cached) {
      return new Response(
        JSON.stringify({
          message: "Returning cached mandi price",
          price: cached
        }),
        { status: 200 }
      );
    }

    // 2️⃣ Fetch from external mandi API
    const apiKey = process.env.DATA_GOV_API_KEY;

    const res = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[commodity]=${commodity}&filters[state]=${state}&filters[district]=${district}`
    );

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      return new Response(
        JSON.stringify({ message: "No price data found" }),
        { status: 404 }
      );
    }

    const mandiData = data.records[0];

    // 3️⃣ Save price in DB
    const priceEntry = await Price.create({
      commodity: mandiData.commodity,
      state: mandiData.state,
      district: mandiData.district,
      market: mandiData.market,
      min_price: mandiData.min_price,
      max_price: mandiData.max_price,
      modal_price: mandiData.modal_price,
      date: mandiData.arrival_date
    });

    // 4️⃣ Trigger WhatsApp notification
    const whatsappSenderPath = path.resolve(
      process.cwd(),
      "whatsappsender.mjs"
    );

    const encodedData = encodeURIComponent(JSON.stringify(priceEntry));

    exec(`node ${whatsappSenderPath} "${encodedData}"`, (error, stdout, stderr) => {
      if (error) console.error("WhatsApp Error:", error);
      if (stderr) console.error("stderr:", stderr);
      if (stdout) console.log("stdout:", stdout);
    });

    return new Response(
      JSON.stringify({
        message: "Price fetched from mandi API and saved",
        price: priceEntry
      }),
      { status: 201 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch mandi price",
        error: err.message
      }),
      { status: 500 }
    );
  }
}

// import { exec } from 'child_process';
// import { connectDB } from '@/app/lib/mongodb';
// import Price from '@/app/models/Price';
// import path from 'path';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     // Save to DB
//     const price = await Price.create(body);

//     // Corrected path to the whatsappSender.mjs script in the utils folder
//     const whatsappSenderPath = path.resolve(process.cwd(), 'test-whatsapp.mjs');

//     // Execute the script (no arguments needed)
//     exec(`node ${whatsappSenderPath}`, (error, stdout, stderr) => {
//       if (error) console.error('WhatsApp Error:', error);
//       if (stderr) console.error('stderr:', stderr);
//       if (stdout) console.log('stdout:', stdout);
//     });

//     return new Response(
//       JSON.stringify({ message: 'Price entry added & message sent!', price }),
//       { status: 201 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ message: 'Failed to save price', error: err.message }),
//       { status: 500 }
//     );
//   }
// }

// export function GET() {
//   return new Response('GET not implemented for this route', { status: 405 });
// }
