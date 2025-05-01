<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import POIList from "$lib/ui/POIList.svelte";
  import { poiService } from "$lib/services/poi-service";
  import { onMount } from "svelte";
  import type { Category, POI } from "$lib/types/poi-types";

  subTitle.text = "POIs to date";

  let pois: POI[] = [];
  onMount(async () => {
   pois = await poiService.getPois(loggedInUser.token);
  });

</script>

<Card title="POIs">
  <POIList {pois} />
</Card>