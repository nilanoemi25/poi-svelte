<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import type { POI } from "$lib/types/poi-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  subTitle.text = "POIs Geo Data";
  let map: LeafletMap;
  let map1: LeafletMap;


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
  <LeafletMap height={50} bind:this={map} />
</Card>
</div>
<!-- 
<div id="map1">
<Card title="POI Locations">
  <LeafletMap height={50} bind:this={map1} />
</Card>
</div>  -->