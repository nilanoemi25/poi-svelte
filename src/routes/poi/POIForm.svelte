<script lang="ts">
  import { currentCategories, currentPOIs, loggedInUser } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Category, POI } from "$lib/types/poi-types";
	import Card from "$lib/ui/Card.svelte";
  import DOMPurify from 'dompurify';
 
    let selectedCategory= $state();
    let POIname = $state("");
    let POIdescription = $state("");
    let POIlatitude = $state(52.160858);
    let POIlongitude =  $state(-7.15242);
    let message = $state("Add POI")

    function sanitizeInput() {
      if(POIname){
       POIname = DOMPurify.sanitize(POIname);
      }
      if(POIdescription){
        POIdescription = DOMPurify.sanitize(POIdescription);
      }
  }

    async function addPOI() {
      if (selectedCategory && POIname && POIlatitude && POIlongitude) { 
      const category = currentCategories.categories.find((category) => category._id === selectedCategory); 
     if (category) {
       const poi: POI = {
          name: POIname,
          description: POIdescription,
          latitude: POIlatitude,
          longitude: POIlongitude,
          categoryid: category.name,
        }; 
        
        const success = await poiService.createPoi(poi, category, loggedInUser.token);
        if (!success) {
          message = "POI not added - some error";
          return;
        }
        message = `Thanks! You added ${POIname} to ${poi.categoryid}`;
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
            <li><a href="/poi/[poi.id]"> {poi.name} and the category is {poi.categoryid}</a></li>
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
      <input bind:value={POIname} oninput={sanitizeInput} class="input" id="POIname" name="POIname" type="text" />
    </div>
    <div class="field">
        <label class="label" for="POI">POI Description:</label>
        <input bind:value={POIdescription} oninput={sanitizeInput} class="input" id="description" name="description" type="text" />
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