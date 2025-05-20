import type { Category } from "$lib/types/poi-types";
import mongoose, { Model } from "mongoose";


const categorySchema = new mongoose.Schema<Category>({
  name: String,
});

let CategoryMongoose: Model<Category>;
try {
  CategoryMongoose = mongoose.model<Category>("Category");
} catch {
  CategoryMongoose = mongoose.model<Category>("Category", categorySchema);
}

export { CategoryMongoose };

