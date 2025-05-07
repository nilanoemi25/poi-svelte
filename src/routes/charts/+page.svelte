<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import { currentPOIs, currentCategories } from "$lib/runes.svelte";
    import { onMount } from "svelte";

  
    subTitle.text = "Charts";
 
    let categoryNames: { name: string; }[] = [];
    let categoryIDs: { id: string | undefined; }[] = [];

    currentCategories.categories.forEach((c) => {
      categoryNames.push({name: c.name});
      categoryIDs.push({id: c._id});
    }); 

    console.log(categoryNames);
    console.log(categoryIDs);

    const chartData = {
      labels: [ categoryNames[0].name,categoryNames[1].name, categoryNames[2].name],
      datasets: [
        {
          values: [0,0,0]
        }
      ]
    };

    onMount(async () => {
     currentPOIs.pois.forEach((poi) => {
      if (poi.categoryid == categoryIDs[0].id) {
        chartData.datasets[0].values[0] += 1;
      } else if (poi.categoryid == categoryIDs[1].id) {
        chartData.datasets[0].values[1] += 1; }
      else if (poi.categoryid == categoryIDs[2].id) {
        chartData.datasets[0].values[2] += 1;
      }
    });
   });
  </script>
  
  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Donations to date</h1>
      <Chart data={chartData} type="bar" />
    </div>

  </div>
  