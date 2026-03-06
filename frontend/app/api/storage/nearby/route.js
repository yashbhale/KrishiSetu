import { connectDB } from "@/app/lib/mongodb"
import Storage from "@/app/models/Storage"

export async function GET(req){
  await connectDB()

  const { searchParams } = new URL(req.url)

  const lat = Number(searchParams.get("lat"))
  const lng = Number(searchParams.get("lng"))

  const storages = await Storage.find({
    coordinates:{
      $near:{
        $geometry:{
          type:"Point",
          coordinates:[lng,lat]
        },
        $maxDistance:10000 // 10km
      }
    }
  })

  return Response.json(storages)
}