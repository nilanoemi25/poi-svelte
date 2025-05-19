
<!-- <script lang="ts">
  import { goto } from "$app/navigation";
  import { poiService } from "$lib/services/poi-service";

  poiService.clearSession();
  goto("/");
</script> -->

<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { clearPoiState } from "$lib/services/poi-utils";

  clearPoiState();
  if (browser) goto("/");
</script>
