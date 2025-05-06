<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import type { POI } from "$lib/types/poi-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  subTitle.text = "POIs Geo Data";
  let map: LeafletMap;

  onMount(async () => {
    const pois = await poiService.getPois(loggedInUser.token);
    pois.forEach((poi: POI) => {
      map.addMarker(poi.latitude, poi.longitude, poi.name);
    });
    const lastPOI = pois[pois.length - 1];
    if (lastPOI) map.moveTo(lastPOI.latitude, lastPOI.longitude);
  });
</script>

<Card title="POI Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
