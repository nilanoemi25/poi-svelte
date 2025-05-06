<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import POIForm from "./POIForm.svelte";
    import type { POI} from "$lib/types/poi-types";
   
  
    subTitle.text = "Add a POI";
    let poiList: POI[] = [];
    
  onMount(async () => {
    poiList = await poiService.getPois(loggedInUser.token)

  });

    //ignore typescript error for poiList
  </script>


  <Card title="Point of Interest">
  <POIForm {poiList}  />
  </Card>