import type { MarkerLayer, MarkerSpec } from "$lib/services/markers";


export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }
  
  export interface Category {
    name: string;
    _id?: string; 
    user?: User | string; 
    pois?: Array<POI>,
    markerLayer?: MarkerLayer;
  }

  export interface POI {
    name:string;
    description:string;
    latitude: number;
    longitude:number;
    categoryid?: Category | string; 
    v?: string; 
    img?: string; 
    markerSpec?: MarkerSpec;
  //  user?: User | string; 
 // category: Category | string; 
  }

  export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}