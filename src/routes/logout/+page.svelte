
<script lang="ts">
  import { goto } from "$app/navigation";
  import { poiService } from "$lib/services/poi-service";

  poiService.clearSession();
  goto("/");
</script>