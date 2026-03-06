export async function POST(req){
  await connectDB()

  const body = await req.json()

  const storage = new Storage({
    ...body,
    coordinates:{
      type:"Point",
      coordinates:[body.lng, body.lat]
    }
  })

  await storage.save()

  return NextResponse.json({message:"Storage posted"})
}