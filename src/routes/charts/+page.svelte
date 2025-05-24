<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import { currentPOIs, currentCategories, currentDataSets } from "$lib/runes.svelte";
    import { onMount } from "svelte";
  
    subTitle.text = "Charts";

    onMount(async () => {

   });


  </script>
  
  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Pois per Category </h1>
      <Chart data={currentDataSets.poibyCategoriesChart} type="bar" />
    </div>
    <p>--</p>
    <div class="column box has-text-centered">
      <h1 class="title is-4">Latitude Variations</h1>
      <Chart data={currentDataSets.latitudeTrendChart} type="pie" />
    </div>
    <p>--</p>
    <div class="column box has-text-centered">
      <h1 class="title is-4"> Poi Name's Length</h1>
      <Chart data={currentDataSets.poiNamesAnalysisChart} type="line" />
    </div>

  </div>
  