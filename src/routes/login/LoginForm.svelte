<script lang="ts">
  import { goto } from "$app/navigation";
  import { poiService } from "$lib/services/poi-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";


  let email = $state("");
  let password = $state("");
  let message = $state("");


  // async function login() {
  //   console.log(`attempting to log in email: ${email} with password: ${password}`);
  //   let session = await poiService.login(email, password);
  //   if (session) {
  //     goto("/category");
  //   } else {
  //     email = "";
  //     password = "";
  //     message = "Invalid Credentials";
  //   }
  // }


</script>

{#if message}
  <Message {message} />
{/if}
<form method="POST" action="?/login">
  <UserCredentials />
  <button class="button is-success is-fullwidth">Log In</button>
</form>