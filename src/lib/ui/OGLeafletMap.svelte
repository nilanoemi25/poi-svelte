<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import { onMount } from "svelte";
    import type { Control, Map as LeafletMap } from "leaflet";
    import { currentCategories, currentPOIs } from "$lib/runes.svelte";
	import { poiService } from "$lib/services/poi-service";
  
    let { height = 80, selectedCategory} = $props(); 
    let id = "home-map-id";
    let id1 = "map1" ;
    let location = { lat: 53.2734, lng: -7.7783203 };
    let zoom = 8;
    let minZoom = 7;
    let activeLayer = "Terrain";
     let L: any;

    //  var a = L.marker([51.8985,-8.4756 ]).bindPopup("Cities"),
    //      b = L.marker([52.2573,-7.1115 ]).bindPopup("Cities"); 
      
   //   var cities = L.layerGroup([a,b]);
    
    let imap: LeafletMap;
    let imap1: LeafletMap;
    let control: Control.Layers;
    let control1: Control.Layers; 
    let overlays: Control.LayersObject =  {}; 
    let baseLayers: any;
   

    // // GET POIS for Category 1
    //   let cat1 = currentCategories.categories[1]._id; 
    //   let cat1Pois = []; 
      
    //   currentPOIs.pois.forEach((poi) => { if(poi.categoryid === cat1) 
    //   cat1Pois.push({lat: poi.latitude, long: poi.longitude, name: poi.name}); 
    //   console.log(cat1Pois); 
    //   })

      // let overlays = { 
      //    "Cities": cities 
      // }; 

   
      onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Satellite: leaflet.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }),
    OpenStreetMap_France: L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
       {
	      maxZoom: 20,
	      attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     }),
     OPNVKarte:L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
	     maxZoom: 18,
	     attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }) };
 
      let defaultLayer = baseLayers[activeLayer]; 


      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });
      control = leaflet.control.layers(baseLayers, overlays).addTo(imap);


    //   imap1 = leaflet.map(id1, {
    //   center: [location.lat + 0.5, location.lng + 0.5],
    //   zoom: zoom,
    //   minZoom: minZoom,
    //   layers: [defaultLayer]
    //   });
    //   control1 = leaflet.control.layers(baseLayers, overlays).addTo(imap1);

    //   if (!imap) {
    //  imap = L.map('map1').setView([51.505, -0.09], 13);
    // }
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

  </script>
  
  <div {id} class="box" style="height: {height}vh"></div>
  