<script lang="ts">
    let { POIlatitude = $bindable(0.0), POIlongitude = $bindable(0.0) } = $props();
  </script>
  
  <div class="box field is-horizontal">
    <div class="field-label is-normal">
      <label for="POIlatitude" class="label">Latitude</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input id="POIlatitude" class="input" type="float" bind:value={POIlatitude} />
        </p>
      </div>
      <div class="field-label is-normal">
        <label for="POILongitude" class="label">Longitude</label>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input id="POIlongitude" class="input" type="float" bind:value={POIlongitude} />
        </p>
      </div>
    </div>
  </div>
  