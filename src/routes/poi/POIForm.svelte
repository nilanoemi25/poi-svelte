
<script lang="ts">
  import { currentCategories, currentPOIs, loggedInUser } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Category, POI } from "$lib/types/poi-types";
	import Card from "$lib/ui/Card.svelte";
 
    let selectedCategory= $state();
    let POIname = $state("");
    let POIdescription = $state("");
    let POIlatitude = $state(52.160858);
    let POIlongitude =  $state(-7.15242);
    let message = $state("Add POI")

    async function addPOI() {
      if (selectedCategory && POIname && POIlatitude && POIlongitude) { 
      const category = currentCategories.categories.find((category) => category._id === selectedCategory); 
     if (category) {
       const poi: POI = {
          name: POIname,
          description: POIdescription,
          //category: selectedCategory,
          latitude: POIlatitude,
          longitude: POIlongitude,
         // user: loggedInUser._id,
          categoryid: category._id,
        }; 
        
        const success = await poiService.createPoi(poi, category, loggedInUser.token);
        if (!success) {
          message = "POI not added - some error";
          return;
        }
        message = `Thanks! You added ${POIname} to ${category}`;
      }
    } else {
      message = "Please select category, poiName, latitude and longitude";
    }
  }

  </script>



  <Card>
    <div class="field">
      <label class="label" for="amount"> Existing POI List:</label>
        <ul>
            {#each currentPOIs.pois as poi}
            <li><a href="/poi/[poi.id]"> {poi.name} and the category is {poi.categoryid} </a></li>
            {/each}
        </ul>
    </div>
  </Card>

  <Card>
  <div class="field">
    <label class="label" for="amount">Category List:</label>
    <div class="select">
      <select bind:value={selectedCategory}>
      {#each currentCategories.categories as c}
          <option value={c._id}>{c.name}</option>
        {/each} 
      </select>
    </div>
  </div>

  <div>
    <div class="field">
      <label class="label" for="POI">POI Name:</label>
      <input bind:value={POIname} class="input" id="POIname" name="POIname" type="text" />
    </div>
    <div class="field">
        <label class="label" for="POI">POI Description:</label>
        <input bind:value={POIdescription} class="input" id="description" name="description" type="text" />
    </div>


    <Coordinates bind:POIlatitude bind:POIlongitude />
    
    <div class="field">
      <div class="control">
        <button onclick={() => addPOI()} class="button">Add POI</button> 
      </div>
    </div>
  </div>

  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>
  </Card>