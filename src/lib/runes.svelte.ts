import type { Category, POI } from "./types/poi-types";


export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });

 export const currentCategories = $state({ categories: [] as Category[] });
 export const currentPOIs = $state({ pois: [] as POI[] });