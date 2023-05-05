<template>
  <div id='map' style='width: 100vw; height: 100vh;'></div>
</template>
<script>
export default {
  mounted() {
    goongjs.accessToken = this.GOONG_API_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 8,
    });
    map.addControl(
      new GoongGeocoder({
        accessToken: this.GOONG_MAP_KEY,
        goongjs: goongjs,
      })
    );
  },
  data() {
    return {
      GOONG_API_KEY: import.meta.env.VITE_APP_GOONG_API_KEY,
      GOONG_MAP_KEY: import.meta.env.VITE_APP_GOONG_MAP_KEY,
    }
  }
}
</script>

<style>
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.goong-geocoder {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
</style>