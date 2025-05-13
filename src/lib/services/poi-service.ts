import axios from "axios";
import type { Session, User, Category, POI } from "$lib/types/poi-types";
import { currentCategories, currentPOIs, loggedInUser } from "$lib/runes.svelte";

export const poiService = {
  baseUrl: "http://localhost:4000",
 //baseUrl: "https://knotty-near-rest.glitch.me", 

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  
  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
       // this.saveSession(session, email);
        await this.refreshCategoryInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  
  async getCategories(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (error) {
    console.log(error);
      return [];
    }
  },

  async refreshCategoryInfo() {
    if (loggedInUser.token) {
    currentCategories.categories = await this.getCategories(loggedInUser.token);
    currentPOIs.pois = await this.getPois(loggedInUser.token);
    }
  },

    saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.donation = JSON.stringify(loggedInUser);
  },


  async restoreSession() {
    const savedLoggedInUser = localStorage.donation;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshCategoryInfo();
  },

  clearSession() {
    currentCategories.categories = [];
    currentPOIs.pois = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },

  //gets all POIs
  async getPois(token: string): Promise<POI[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/pois");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  },

  async getPoisById(token: string): Promise<POI[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/pois/{id}");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  },


  async createCategory(category:Category,token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(this.baseUrl + "/api/categories", category);
      await this.refreshCategoryInfo();
      return response.data;
    } catch (error) {
    console.log(error);
    return false;
    }
  },

  async createPoi(poi: POI, category:Category, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(this.baseUrl + "/api/categories/" + category._id + "/pois", poi);
      await this.refreshCategoryInfo();
    //  return response.status == 200;
    return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  //not working 
  async deleteImage(public_id: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/deleteImage`, public_id);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },




};
