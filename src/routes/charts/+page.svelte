<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import { currentPOIs, currentCategories } from "$lib/runes.svelte";
    import { onMount } from "svelte";
  
    subTitle.text = "Charts";
 
    let categoryNames: { name: string; }[] = [];
    let categoryIDs: { id: string | undefined; }[] = [];
   // let NamesLength: { name: string; len: number; }[] = [];
   let PoiNamesLength: { name: string; len: number; }[] = [];

    currentCategories.categories.forEach((c) => {
      categoryNames.push({name: c.name});
      categoryIDs.push({id: c._id});
    }); 

    currentPOIs.pois.forEach((p)=>{
    PoiNamesLength.push({name: p.name, len: p.name.length})
    });
    
  //   categoryNames.forEach((catName) => {
  //   NamesLength.push({ name: catName.name, len: catName.name.length})
  //   }
  //  ); 

    console.log(categoryNames);
    console.log(categoryIDs);
   // console.log(NamesLength); 
   console.log(PoiNamesLength);

    const chartData1 = {
      labels: [ categoryNames[0].name,categoryNames[1].name, categoryNames[2].name],
      datasets: [
        {
          values: [0,0,0]
        }
      ]
    };

    const chartData2 = {
      labels: [ "GreaterThan", "LessThan"],
      datasets: [
        {
          values: [0,0]
        }
      ]
    };

    
    const chartData3 = {
      labels: [ PoiNamesLength[0].name, PoiNamesLength[1].name,PoiNamesLength[2].name,PoiNamesLength[3].name,PoiNamesLength[4].name, PoiNamesLength[5].name,],
      datasets: [
        {
          values: [0,0,0,0,0.0]
        }
      ]
    };

    onMount(async () => {
     currentPOIs.pois.forEach((poi) => {
      if (poi.categoryid == categoryIDs[0].id) {
        chartData1.datasets[0].values[0] += 1;
      } else if (poi.categoryid == categoryIDs[1].id) {
        chartData1.datasets[0].values[1] += 1; }
      else if (poi.categoryid == categoryIDs[2].id) {
        chartData1.datasets[0].values[2] += 1;
      }
    });

    currentPOIs.pois.forEach((poi)=>
  {
    if(poi.latitude >= 51 && poi.latitude <= 52){
      chartData2.datasets[0].values[0] += 1;
    } else if (poi.latitude <= 56){
      chartData2.datasets[0].values[1] += 1;
    }
  })

  currentPOIs.pois.forEach((poi)=>
  {
    if(poi.name == PoiNamesLength[0].name ){
      chartData3.datasets[0].values[0] = PoiNamesLength[0].len;
    } else if (poi.name == PoiNamesLength[1].name){
      chartData3.datasets[0].values[1] = PoiNamesLength[1].len;
    }
    else if (poi.name == PoiNamesLength[2].name){
      chartData3.datasets[0].values[2] = PoiNamesLength[2].len;
    }
    else if (poi.name == PoiNamesLength[3].name){
      chartData3.datasets[0].values[3] = PoiNamesLength[3].len;
    }
    else if (poi.name == PoiNamesLength[4].name){
      chartData3.datasets[0].values[4] = PoiNamesLength[4].len;
    }
    else if (poi.name == PoiNamesLength[5].name){
      chartData3.datasets[0].values[5] = PoiNamesLength[5].len;
    }
  })


   });




  </script>
  
  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Pois per Category </h1>
      <Chart data={chartData1} type="bar" />
    </div>
    <p> HELLO </p>
    <div class="column box has-text-centered">
      <h1 class="title is-4">Latitude Variations</h1>
      <Chart data={chartData2} type="pie" />
    </div>
    <div class="column box has-text-centered">
      <h1 class="title is-4"> Poi Name's Length</h1>
      <Chart data={chartData3} type="line" />
    </div>

  </div>
  