<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { poiService } from "$lib/services/poi-service";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import CategoryForm from "./CategoryForm.svelte";
    import type { Category } from "$lib/types/poi-types";
   
  
    subTitle.text = "Add a Category";
    let categoryList: Category[] = [];
    //console.log(categoryList)
    // Issue with categories API per user hence getting all categories from db


  onMount(async () => {
    categoryList = await poiService.getCategories(loggedInUser.token)
  });

  </script>

  
  <Card title="Point of Interest">
  <CategoryForm {categoryList} />
  </Card>