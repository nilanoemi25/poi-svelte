<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
	import { onMount } from "svelte";
  import CategoryForm from "./CategoryForm.svelte";
	import { poiService } from "$lib/services/poi-service";
	import type { Category } from "$lib/types/poi-types";
	let { data } = $props();

  subTitle.text = "Add a Category";

  let categoryList: Category[] = [];

//onMount(async () => {
//categoryList = await poiService.getCategories(loggedInUser.token);
//});


</script>

<Card title="Categories from data.js">
  {#each data.categories as { categoryid, name }}
  <li><a href="/category/{name}">{name}</a></li>
{/each}
</Card>
<Card>
  <CategoryForm {categoryList}/>
</Card>