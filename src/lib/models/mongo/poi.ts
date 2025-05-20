import type { POI } from "$lib/types/poi-types";
import mongoose, { Model } from "mongoose";


const POISchema = new mongoose.Schema<POI>({
    name: String,
    description: String,
    latitude: String, 
    longitude: String, 
    img: String, 
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  });

  let POIMongoose: Model<POI>;
try {
  POIMongoose = mongoose.model<POI>("POI");
} catch {
  POIMongoose = mongoose.model<POI>("POI", POISchema);
}

export { POIMongoose };