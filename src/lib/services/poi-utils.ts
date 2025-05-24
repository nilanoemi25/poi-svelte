import { currentCategories, currentPOIs, loggedInUser, currentDataSets } from "$lib/runes.svelte";
import type { POI, Category } from "$lib/types/poi-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function generateMarkerSpec(poi: POI): MarkerSpec {
  return <MarkerSpec>{
    id: poi.categoryid,
    title: poi.name,
    location: {
      lat: poi.latitude,
      lng: poi.longitude
    }
  };
}

export function generateMarkerSpecs(poi: Array<POI>): MarkerSpec[] {
  const markerSpecs = Array<MarkerSpec>();
 poi.forEach((p) => {
    markerSpecs.push(p.markerSpec);
  });
  return markerSpecs;
}

export function generateMarkerLayer(category: Category): MarkerLayer {
  return {
    title: category.name, 
    markerSpecs: generateMarkerSpecs(category.pois)
  };
}

export function generateMarkerLayers(cats: Category[]): MarkerLayer[] {
  const markerLayers: Array<MarkerLayer> = [];
  cats.forEach((cats) => {
    markerLayers.push(cats.markerLayer);
  });
  return markerLayers;
}

export function latitudeTrendChart (poiList: POI[]) {
  poiList.forEach((poi)=>
  {
    if(poi.latitude >= 51 && poi.latitude <= 52){
      currentDataSets.latitudeTrendChart.datasets[0].values[0] += 1;
    } else if (poi.latitude <= 56){
      currentDataSets.latitudeTrendChart.datasets[0].values[1] += 1;
    }
  })
}

export function poiByCategoriesChart(poiList: POI[], categoryList: Category[])
{

   currentDataSets.poibyCategoriesChart.labels = [];
    categoryList.forEach((n) =>{
        currentDataSets.poibyCategoriesChart.labels.push(`${n.name}`);
        currentDataSets.poibyCategoriesChart.datasets[0].values.push(0);
      });

    poiList.forEach((poi) => {
    for (let i = 0; i < categoryList.length; i++) {
    if (poi.categoryid === categoryList[i]._id) {
    currentDataSets.poibyCategoriesChart.datasets[0].values[i] += 1;
    break; 
    }}
  })
}


export function poiNamesAnalysisChart(poiList: POI[])
{
   currentDataSets.poiNamesAnalysisChart.labels = [];
    poiList.forEach((n) =>{
        currentDataSets.poiNamesAnalysisChart.labels.push(`${n.name}`);
        currentDataSets.poiNamesAnalysisChart.datasets[0].values.push(0);
      });

      currentPOIs.pois.forEach((poi)=>{
        for(let i =0; i < poiList.length; i++){
          if(poi.name === poiList[i].name){
          currentDataSets.poiNamesAnalysisChart.datasets[0].values[i] = poiList[i].name.length;
          break; 
          }
        }
      }); 
}

export async function refreshPoiState(pois: POI[], categories: Category[]) {
  currentPOIs.pois = pois; 
  currentCategories.categories = categories;
}

export function clearPoiState() {
  currentPOIs.pois = [];
  currentCategories.categories = [];
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
  localStorage.removeItem("donation");

}


export function getCategoryNames(categoryNames){
  currentCategories.categories.forEach((c) => {
      categoryNames.push({name: c.name});
    }); 
    return categoryNames; 
    
}

export function getCategoryIDs(categoryIDs){
  currentCategories.categories.forEach((c) => {
      categoryIDs.push({id: c._id});
    }); 
    return categoryIDs; 
    
}

export function getPoiNamesLength(PoiNamesLength){
currentPOIs.pois.forEach((p)=>{
    PoiNamesLength.push({name: p.name, len: p.name.length});
    });
    
  return PoiNamesLength; 
}

export function getPoiLatitude(PoiLatitude){
currentPOIs.pois.forEach((p)=>{
    PoiLatitude.push({latitude: p.latitude});
    });
    
  return PoiLatitude; 
}

export function getPoiLongitude(PoiLongitude){
currentPOIs.pois.forEach((p)=>{
     PoiLongitude.push({longitude: p.longitude}); 
    });
    
  return PoiLongitude; 
}

