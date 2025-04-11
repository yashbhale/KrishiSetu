// File: app/api/gemini-helper/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const contents = [{ parts: [{ text: prompt }] }];

    const apiKey = 'AIzaSyCNAEPa9btaB2eYw05ZxZGo6INVlojTxXE'; // move to env variable in prod

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      }
    );

    const geminiData = await geminiRes.json();

    const result =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from Gemini.';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in gemini-helper route:', error);
    return NextResponse.json(
      { result: 'Error generating analysis.' },
      { status: 500 }
    );
  }
}
