<script lang="ts">
  import SignupForm from "./SignupForm.svelte";

    export let form;

  //   https://github.com/consultingninja/kitAuth/tree/main/src
</script>

<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <h1 class="title has-text-centered">Signup to POI</h1>
          <SignupForm />
        </div>
        <div class="column is-6 is-offset-1">
          <figure class="image is-4by3">
            <img class="object-fit" src="/map2.jpg" alt="map" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>


    
    
    <div class="sign-in-wrapper">
        <div class="sign-in-content"></div>
        <h2>Sign Up to POI </h2>
     <form class="auth-form" method="post" action="?/OAuth2">
        <div>
            <button class="btn-auth"  type="submit">
            <img class="btn-auth-img" src='https://developers.google.com/static/identity/images/branding_guide_do_1.png' alt='google sign in'/>
            </button>
        </div>
          </form>
    </div>
