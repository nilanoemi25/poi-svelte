<script lang="ts">
	import { currentCategories, loggedInUser } from "$lib/runes.svelte";
	import { poiService } from "$lib/services/poi-service";
	import type { Category } from "$lib/types/poi-types";

    let { categoryList = [] } = $props();
    let message = $state("");
    let categoryname = $state("");
  //  let selectedCategory= $state("Castle");
   
    async function addCategory() {
        const category: Category = {
         name: categoryname,
        };
        const success = await poiService.createCategory(category, loggedInUser.token);
        if (!success) {
          message = "POI not added - some error occurred";
          return;
        }
        else {
        message = `Thanks! You added ${categoryname}`;
       } 
      } 

      

  </script>
  <div class="field">
    <label class="label" for="amount"> Existing Category List:</label>
      <ul>
          {#each categoryList as category}
          <li><a href="/poi"> {category.name}</a></li>
          {/each}
      </ul>
  </div>
  
    <!--
    <div class="select">
    <select>
        {#each categoryList as category}
          <option value={category._id}>{category.name}</option>
        {/each}
    </select>
    </div>
  </div>
  -->

  <div>
    <div class="field">
      <label class="label" for="category">Add new Category:</label>
      <input bind:value={categoryname} class="input" id="category" name="category" type="text" />
    </div>
    
    <div class="field">
      <div class="control">
        <button onclick={() => addCategory()} class="button">Add Category</button>
      </div>
    </div>
  </div>

  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>
  