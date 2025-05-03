<script lang="ts">
let { pois } = $props();
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>POIName</th>
        <th>Category</th>
        <th>POIdescription</th>
        <th>POIlatitude</th>
        <th>POIlongitude</th>
      </tr>
    </thead>
    <tbody>
      {#each pois as poi}
        <tr>
          <td>
            {poi.name}
          </td>
          <td>
            {poi.categoryid}
          </td><td>
            {poi.description}
          </td>
          <td>
            {poi.latitude}
          </td>
          <td>
            {poi.longitude}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  