import type { Session, User } from "$lib/types/poi-types";
import type { Category, POI } from "$lib/types/poi-types";
import { userStore } from "$lib/models/mongo/user-store";
import { poiMongoStore} from "$lib/models/mongo/poi-store";
import { categoryMongoStore} from "$lib/models/mongo/category-store";


export const poiService = {
  async signup(user: User): Promise<boolean> {
    try {
      const newUser = await userStore.add(user);
      return !!newUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await userStore.findBy(email);
      if (user !== null && user.password === password) {
        const session = {
          name: `${user.firstName} ${user.lastName}`,
          token: user._id!.toString(),
          _id: user._id!.toString(),
          email: user.email
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

    async createPoi(poi: POI, category:Category ) {
    try {
      const newPOI = await poiMongoStore.addPoi(poi, category);
      return JSON.parse(JSON.stringify(newPOI));
    //  await this.refreshCategoryInfo();
    //  return response.status == 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },


    async createCategory(category:Category) {
    try {
      const response = await categoryMongoStore.addCategory(category); 
      return response.data;
    } catch (error) {
    console.log(error);
    return false;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const candidates = await categoryMongoStore.getAllCategories();
      return JSON.parse(JSON.stringify(candidates));
    } catch (error) {
      return [];
    }
  },

  async getPois(): Promise<POI[]> {
    try {
      const candidates = await poiMongoStore.getAllPois();
      return JSON.parse(JSON.stringify(candidates));
    } catch (error) {
      return [];
    }
  },


}
