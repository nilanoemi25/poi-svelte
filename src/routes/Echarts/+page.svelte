<script lang="ts">
  import { onMount } from "svelte";
	import { getCategoryIDs, getCategoryNames, getPoiLatitude, getPoiLongitude, getPoiNamesLength } from '$lib/services/poi-utils';
  import * as echarts from 'echarts';

    let categoryNames: { name: string; }[] = [];
    let categoryIDs: { id: string | undefined; }[] = [];
    let PoiNamesLength: { name: string; len: number; }[] = [];
    let PoiLatitude: any[] = [];
    let PoiLongitude: any[] = []; 
    let chartContainer; 
    let chartContainer2; 

     getCategoryNames(categoryNames);
     getCategoryIDs(categoryIDs);
     getPoiNamesLength(PoiNamesLength);
     getPoiLatitude(PoiLatitude);
     getPoiLongitude(PoiLongitude);

  onMount(() => {
    if (chartContainer) {
      const chart = echarts.init(chartContainer);
      let infoArray: any[] = []; 
      PoiLatitude.forEach(poi => infoArray.push(poi.latitude));
  
      let categoryNames: string[] = [];
       PoiNamesLength.forEach(poi => categoryNames.push(poi.name));

      chart.setOption({
        title: { text: "Latitude per POI" },
        xAxis: {
          type: "category",
          data: categoryNames },
        yAxis: { type: "value" },
        series: [{ type: "line", data: infoArray }]
      });
    }
  

    if (chartContainer2) {
      const chart = echarts.init(chartContainer2);
      let infoArray: any[] = []; 
      PoiLongitude.forEach(poi => infoArray.push(poi.longitude));
  
      let categoryNames: string[] = [];
       PoiNamesLength.forEach(poi => categoryNames.push(poi.name));

      chart.setOption({
        title: { text: "Longitude POI" },
        xAxis: {
          type: "category",
          data: categoryNames},
        yAxis: { type: "value" },
        series: [{ type: "bar", data: infoArray }]
      });
    }
  });
</script>

<div class="app" bind:this={chartContainer}></div>

<div class="app" bind:this={chartContainer2}></div>


<style>
  .app { width: 100vw; height: 50vh; }
</style>

