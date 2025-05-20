import type { Category } from "$lib/types/poi-types.js";
import { CategoryMongoose } from "./category.js";
import { POIMongoose  } from "./poi.js";

export const categoryMongoStore = {
  async getAllCategories(): Promise<Category[]> {
    const categories = await CategoryMongoose.find().lean();
    return categories;
  },

  async getCategoryById(id: string):Promise<Category | null> {
    if (id) {
      const category = await CategoryMongoose.findOne({ _id: id }).lean();
      if (category) {
        category.pois = await POIMongoose.getPoisByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category: Category) {
    const newCategory = new CategoryMongoose(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  
  },

  async getUserCategories(id: string) {
    const category = await CategoryMongoose?.find({ userid: id }).lean();
    return category
},
    

//    async deleteCategoryById(id) {
//     try {
//       await Category.deleteOne({ _id: id })
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

//   async deleteAllCategories() {
//     await Category.deleteMany({});
//   },

//   async updateCategory(updatedCategory) {
//     const category = await Category.findOne({ _id: updatedCategory._id });
//     category.name = updatedCategory.name;
//     category.img = updatedCategory.img;
//     await category.save();
//   },


};
