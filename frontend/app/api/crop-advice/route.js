import { NextResponse } from "next/server"

export async function POST(req){

 const { commodity, modal_price, market } = await req.json()

 const prompt = `
 You are an agriculture market advisor.

 Crop: ${commodity}
 Market: ${market}
 Current Price: ₹${modal_price}

 Tell a farmer in simple language:
 - whether to sell now or wait
 - possible market trend
 `

 const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
   method:"POST",
   headers:{ "Content-Type":"application/json"},
   body:JSON.stringify({
    contents:[{ parts:[{ text:prompt }] }]
   })
  }
 )

 const data = await res.json()

 const advice =
  data?.candidates?.[0]?.content?.parts?.[0]?.text || "No advice generated"

 return NextResponse.json({ advice })
}