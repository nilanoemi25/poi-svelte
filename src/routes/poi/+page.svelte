<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import POIForm from "./POIForm.svelte";
    import type { Category } from "$lib/types/poi-types";
   
  
    subTitle.text = "Add a POI";
    let categoryList: Category[] = [];

  onMount(async () => {
    categoryList = await poiService.getCategories(loggedInUser.token);
  });
  </script>
  
  <Card title="Point of Interest">
    <POIForm {categoryList} />
  </Card>