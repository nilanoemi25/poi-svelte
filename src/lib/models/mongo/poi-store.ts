import type { POI } from "$lib/types/poi-types.js";
import { POIMongoose } from "./poi.js";
import { CategoryMongoose } from "./category.js";

export const poiMongoStore = {
  async getAllPois(): Promise<POI[]> {
    const pois = await POIMongoose.find().lean();
    return pois;
  },

  async addPoi(categoryid:typeof CategoryMongoose, poi:POI) {
    poi.categoryid = categoryid;
    const newPoi = new POIMongoose(poi);
    const poiObj = await newPoi.save();
    return this.getPoiById(poiObj._id);
  },

  async getPoisByCategoryId(id:string) {
    const pois = await POIMongoose.find({ categoryid: id }).lean();
    return pois;
  },

//   async getPoiById(id:string) {
//     if (Mongoose.isValidObjectId(id)) {
//       const poi = await POIMongoose.findOne({ _id: id }).lean();
//       return poi;
//     }
//     return null;
//   },

//   async deletePoi(id) {
//     try {
//       await Poi.deleteOne({ _id: id });
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

  async deleteAllPois() {
    await POIMongoose.deleteMany({});
  },

//   async updatePoi(poi:POI, updatedPoi:POI) {
//     const poiDoc = await POIMongoose.findOne({ _id: poi._id });
//     poiDoc.name = updatedPoi.name;
//     poiDoc.description = updatedPoi.description;
//     poiDoc.latitude = updatedPoi.latitude;
//     poiDoc.longitude = updatedPoi.longitude;
//     poiDoc.img = updatedPoi.img; 
//     await poiDoc.save();
//   },
};

