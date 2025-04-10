import { connectDB } from "@/app/lib/mongodb";
import Crop from "@/app/models/Crop.model.js";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Enable formData parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const location = formData.get("location");
    const sellerId = formData.get("sellerId");

    const image = formData.get("image");

    let imageurl = "";
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", filename);

      await writeFile(filePath, buffer);
      imageurl = `/uploads/${filename}`;
    }

    const newCrop = new Crop({
      name,
      description,
      imageurl,
      price,
      quantity,
      location,
      sellerId,
    });

    await newCrop.save();

    return NextResponse.json({ message: "Crop listed successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error listing crop:", error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
