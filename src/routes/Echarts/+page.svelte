<script lang="ts">
  import { Chart } from 'svelte-echarts';
  import { init, use } from 'echarts/core';
  import { BarChart, LineChart } from 'echarts/charts';
  import { GridComponent, TitleComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { currentCategories, currentPOIs } from '$lib/runes.svelte';
  import { onMount } from "svelte";
  import { poiService } from '$lib/services/poi-service';

  use([BarChart, LineChart, GridComponent, CanvasRenderer, TitleComponent]);

    let categoryNames: { name: string; }[] = [];
    let categoryIDs: { id: string | undefined; }[] = [];
    let PoiNamesLength: { name: string; len: number; }[] = [];
    let PoiLatitude: any[] = [];
    let PoiLongitude = []; 

    console.log(PoiLatitude)

    currentCategories.categories.forEach((c) => {
      categoryNames.push({name: c.name});
      categoryIDs.push({id: c._id});
    }); 

    currentPOIs.pois.forEach((p)=>{
    PoiNamesLength.push({name: p.name, len: p.name.length});
    PoiLatitude.push({latitude: p.latitude});
    PoiLongitude.push({longitude: p.longitude});
    });

  let infoArray = [PoiLatitude[0]["latitude"], PoiLatitude[1]["latitude"], PoiLatitude[2]["latitude"], PoiLatitude[3]["latitude"], PoiLatitude[4]["latitude"] ]; 

  let options = {
    title: { text: 'Latitude per POI' },
    xAxis: { type: 'category', data: [ PoiNamesLength[0]["name"], PoiNamesLength[1]["name"], PoiNamesLength[2]["name"],PoiNamesLength[3]["name"],PoiNamesLength[4]["name"] ] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: infoArray }]
  };

    
</script>

<div class="app">
  <Chart {init} {options} />
</div>

<style>
  .app { width: 100vw; height: 50vh; }
</style>

