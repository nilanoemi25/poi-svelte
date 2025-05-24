<script lang="ts">
  import { currentCategories, currentPOIs, loggedInUser, subTitle } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
	import { getCategoryNames, getPoiLatitude, getPoiLongitude, getPoiNamesLength } from "$lib/services/poi-utils";
  import type { POI } from "$lib/types/poi-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import leaflet from "leaflet";
  import { onMount } from "svelte";

  subTitle.text = "POIs Geo Data";
  let map: LeafletMap;
 
  let overylays = {};

   let overlays = {
    "Cities": leaflet.layerGroup([
      leaflet.marker([51.8985, -8.4756]).bindPopup("Cork"),
      leaflet.marker([52.2573, -7.1115]).bindPopup("Waterford"),
      leaflet.marker([53.3498, -6.2603]).bindPopup("Dublin")
    ]),
    "Castles": leaflet.layerGroup([
      leaflet.marker([52.1341, -8.6392]).bindPopup("Mallow Castle"),
      leaflet.marker([51.8999, -8.4027]).bindPopup("Blackrock Castle")
    ]),
  };
 

  onMount(async () => {
    const pois = await poiService.getPois(loggedInUser.token);
    pois.forEach((poi: POI) => {
      map.addMarker(poi.latitude, poi.longitude, poi.name);
    });
    const lastPOI = pois[pois.length - 1];
    if (lastPOI) map.moveTo(lastPOI.latitude, lastPOI.longitude);
  });


</script>


<div id ="home-map-id">
<Card title="POI Locations">
  <LeafletMap height={50} bind:this={map} overlays={overlays} />
</Card>
</div>
