<script>
// @ts-nocheck
	import { subTitle } from "$lib/runes.svelte";
	import { CldImage } from 'svelte-cloudinary';
	import { CldUploadButton, CldUploadWidget } from 'svelte-cloudinary';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME, PUBLIC_CLOUDINARY_API_KEY } from '$env/static/public';
	import Card from "$lib/ui/Card.svelte";  
    import { currentPOIs } from "$lib/runes.svelte";
	import axios from "axios";
	import { poiService } from "$lib/services/poi-service";

//	let { poiDetails } = $props();
  
	/**
	 * @type {{ width: any; height: any; secure_url: any; }}
	 */
	let info; 
	/**
	 * @type {{ status: any; }}
	 */
	let error; 

	let flag = 0; 

 

	// @ts-ignore
	function onUpload(result, widget) {
	if (result.event === 'success') {
			info = result.info;
			// flag += 1; 
			console.log(info);
			console.log(flag); 
		} else if (result.event === 'error') {
			error = result.error;
		}

		widget.close();
	}


   async function deleteImage(publicId) {
   const response = poiService.deleteImage(publicId)
  };

   
	subTitle.text = "Poi Images" 

</script>


<div>
<ul class="columns is-multiline">
    {#each currentPOIs.pois as poi}
        <li class="column is-four-fifths">
            <h3>{poi.name}</h3>
			<div>
			<div class="container">
			<CldUploadWidget uploadPreset="Uppreset" options={{ public_id: `${poi.name}` }} let:open let:isLoading {onUpload}>
				<button onclick={() => open()} disabled={isLoading} class="button">
				Add Image
				</button>
						{#if error}
			<p>{error.status}</p>
		    {/if}

		   {#if info}
		   {#if info.public_id == poi.name}
			<p>
					<CldImage width={info.width} height={info.height} src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/{poi.name}.jpg"    alt="Uploaded image" overlays={[
		{
		text: {
			color: 'black',
			fontFamily: 'Source Sans Pro',
			fontSize: 75,
			fontWeight: 'bold',
			text: `${poi.name}`
		},
		},
	]} />
			</p>
			<p>{info?.secure_url}</p>
		   {/if}
		   {/if}
			</CldUploadWidget>
				
		 <div class="container">
				<button onclick={() => deleteImage(`${poi.name}`)} class="button">
					Delete Image not Working
				</button>
			</div> 
			</div>
			</div>
        </li>
    {/each}
</ul>
</div>
<hr>

<div>
	<h1 class="title has-text-centered" > Image Gallery </h1>
{#each currentPOIs.pois as poi}
  <li class="column is-one-third">
     Hello {poi.name} <br> 
  		<p>
		<CldImage width={380} height={150} src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/{poi.name}.jpg" alt="Uploaded image" overlays={[
		{
		text: {
			color: 'black',
			fontFamily: 'Source Sans Pro',
			fontSize: 75,
			fontWeight: 'bold',
			text: `${poi.name}`
	     	},
	     	},
          	]} />
		</p>
   </li>
{/each}
</div>


<!-- <div>
	{#each currentPOIs.pois as poi}
	<CldImage
	width="400"
	height="400"
	src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/{poi.name}-image.jpg"
	alt="Poi image if uploaded"
	overlays={[
		{
		text: {
			color: 'black',
			fontFamily: 'Source Sans Pro',
			fontSize: 50,
			fontWeight: 'bold',
			text: `${poi.name}`
		},
		},
	]}
	/>
	{/each}
</div> -->