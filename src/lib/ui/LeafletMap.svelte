<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import { onMount } from "svelte";
    import type { Control, Map as LeafletMap } from "leaflet";
    import { currentCategories, currentPOIs } from "$lib/runes.svelte";
	import { poiService } from "$lib/services/poi-service";
  
    let { height = 80 } = $props(); 
    let id = "home-map-id";

    let location = { lat: 53.2734, lng: -7.7783203 };
    let zoom = 8;
    let minZoom = 7;
    let activeLayer = "Terrain";
    let L: any;
    let imap: LeafletMap;
    let control: Control.Layers;
    let overlays: Control.LayersObject =  {}; 
    let baseLayers: any;


   
    onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    //  fetchData();

    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      
 };
 
      let defaultLayer = baseLayers[activeLayer]; 

    overlays = {
        "Cities": leaflet.layerGroup([
            leaflet.marker([51.8985, -8.4756]).bindPopup("Cork"),
            leaflet.marker([52.2573, -7.1115]).bindPopup("Waterford"),
            leaflet.marker([52.6638, -8.6267]).bindPopup("Limerick"),
            leaflet.marker([53.2740, -9.0513]).bindPopup("Galway")
        ]),
        "Castle": leaflet.layerGroup([
            leaflet.marker([52.1341, -8.6392]).bindPopup("Mallow Castle"),
            leaflet.marker([51.8999, -8.4027]).bindPopup("Blackrock Castle")
        ]),
    };

  


      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer, overlays["Cities"], overlays["Castle"]]
      });
      control = leaflet.control.layers(baseLayers, overlays).addTo(imap);



  });


    export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }


  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }

//    async function fetchData(){
//     const apiKey = "4111bc62708478a8a0233bf6fe177a24";
//     const url = `api.openweathermap.org/data/2.5/forecast?lat=52.25&lon=7.11&appid=4111bc62708478a8a0233bf6fe177a24`
//     const weatherData = await fetch(url); 
//     console.log(weatherData); 
//   }

 

  </script>
  
  <div {id} class="box" style="height: {height}vh"></div>
  

   


   