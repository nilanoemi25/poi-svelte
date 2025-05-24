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

 export const currentDataSets = $state({
      poibyCategoriesChart: {
      labels: [],
      datasets: [
        {
          values: [0,0]
        }
      ]
    },
    latitudeTrendChart: {
      labels: [ "GreaterThan", "LessThan"],
      datasets: [
        {
          values: [0,0]
        }
      ]
    },

     poiNamesAnalysisChart: {
      labels: [],
      datasets: [
        {
          values: [0,0]
        }
      ]
    }
 })