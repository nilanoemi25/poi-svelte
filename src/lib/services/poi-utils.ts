import { currentCategories, currentPOIs, loggedInUser } from "$lib/runes.svelte";
import type { POI, Category } from "$lib/types/poi-types";

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
}


