<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
	import { poiService } from "$lib/services/poi-service";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
	import { onMount } from "svelte";

  onMount(async () => {
    await poiService.restoreSession();
  });

</script>

<div class="container">
  {#if loggedInUser.name}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>