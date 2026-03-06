import { connectDB } from "@/app/lib/mongodb"
import Crop from "@/app/models/Crop.model"

export async function GET(){

 await connectDB()

 const result = await Crop.aggregate([
  {
   $group:{
    _id:"$name",
    listings:{ $sum:1 },
    avgPrice:{ $avg:"$price" }
   }
  },
  {
   $addFields:{
    demandScore:{
     $multiply:["$listings","$avgPrice"]
    }
   }
  },
  { $sort:{ demandScore:-1 } },
  { $limit:5 }
 ])

 return Response.json(result)
}