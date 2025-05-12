<script>
// @ts-nocheck
	import { subTitle } from "$lib/runes.svelte";
	import { CldImage } from 'svelte-cloudinary';
	import { CldUploadButton, CldUploadWidget } from 'svelte-cloudinary';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME, PUBLIC_CLOUDINARY_API_KEY } from '$env/static/public';
	import Card from "$lib/ui/Card.svelte";  
    import { currentPOIs } from "$lib/runes.svelte";

	let { poiDetails } = $props();
  
	

	/**
	 * @type {{ width: any; height: any; secure_url: any; }}
	 */
	let info; 
	/**
	 * @type {{ status: any; }}
	 */
	let error; 
 

	// // @ts-ignore
	// function onUpload(result, widget) {
	// 	if (result.event === 'success') {
	// 		info = result.info;
	// 		console.log(info);
	// 	} else if (result.event === 'error') {
	// 		error = result.error;
	// 	}

	// 	widget.close();
	// }

	async function deleteImage(publicId) {
  const response = await fetch("/api/deleteImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id: publicId }),
  });

  const data = await response.json();
  if (data.success) {
    console.log("Image deleted successfully!");
  } else {
    console.error("Error deleting image:", data.error);
  }
}

   
	subTitle.text = "Poi Images" 
	
	

</script>

<!-- <h1>{@html poiDetails}</h1>  -->


<ul class="columns is-multiline">
    {#each currentPOIs.pois as poi}
        <li class="column is-one-third">
            <h3>{poi.name}</h3>
			<div>
				<div class="container">
				<CldUploadWidget uploadPreset="Uppreset" options={{ public_id: `${poi.name}-image` }} let:open let:isLoading>
					<button onclick={() => open()} disabled={isLoading} class="button">
					Add Image
					</button>
				</CldUploadWidget>
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
			<div class="container">
				<button onclick={() => deleteImage(`${poi.name}-image.jpg`)} class="button">
					Delete Image not Working
				</button>
				</div>
			</div>
        </li>
    {/each}
</ul>

<!-- <Card>
	<header class="card-header">
		<p class="card-header-title">Card header</p>
	</header>	
  <CldImage
  width="400"
  height="400"
  src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/lfymeyhe9vanluto2jog.jpg"
  alt="T"
  />
  <CldImage
  width="400"
  height="400"
  src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/lfymeyhe9vanluto2jog.jpg"
  alt="T"
  />
  <CldImage
  width="400"
  height="400"
  src="https://res.cloudinary.com/djqxe7bqw/image/upload/v1746962741/lfymeyhe9vanluto2jog.jpg"
  alt="T"
  />

</Card> -->
 