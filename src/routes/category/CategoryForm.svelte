<script lang="ts">
	import { currentCategories, loggedInUser } from "$lib/runes.svelte";
	import { poiService } from "$lib/services/poi-service";
	import type { Category } from "$lib/types/poi-types";
  import DOMPurify from 'dompurify';

    let { categoryList = [] } = $props();
    let message = $state("");
    let categoryname = $state("");
   
    async function addCategory() {
        const category: Category = {
         name: categoryname,
        };
        const success = await poiService.createCategory(category);
        if (!success) {
          message = "Category not added - some error occurred";
          return;
        }
        else {
        message = `Thanks! You added ${categoryname}`;
       } 
      } 

  function sanitizeInput() {
    categoryname = DOMPurify.sanitize(categoryname);
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


  <div>
    <div class="field">
      <label class="label" for="category">Add new Category:</label>
      <input bind:value={categoryname} oninput={sanitizeInput} class="input" id="category" name="category" type="text" />
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
  