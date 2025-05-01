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
            {poi.POIname}
          </td>
          <td>
            {poi.Category}
          </td><td>
            {poi.POIdescription}
          </td>
          <td>
            {poi.POIlatitude}
          </td>
          <td>
            {poi.POIlongitude}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  