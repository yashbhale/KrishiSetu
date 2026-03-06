import { connectDB } from "@/app/lib/mongodb"
import PriceAlert from "@/app/models/PriceAlert"

export async function POST(req){

 await connectDB()

 const body = await req.json()

 const alert = await PriceAlert.create(body)

 return Response.json(alert)
}