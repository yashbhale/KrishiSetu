export async function GET() {
  const sampleData = {
    buys: [
      { crop: 'Wheat', amount: 24000, farmer: 'Ravi' },
      { crop: 'Rice', amount: 20000, farmer: 'Anil' },
      { crop: 'Corn', amount: 27000, farmer: 'Sunita' },
    ],
    sells: [
      { product: 'Fertilizer', amount: 10000, farmer: 'Ravi' },
      { product: 'Pesticide', amount: 6000, farmer: 'Anil' },
      { product: 'Seeds', amount: 16000, farmer: 'Sunita' },
    ],
  };

  return Response.json(sampleData);
}
