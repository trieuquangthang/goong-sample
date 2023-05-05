<template>
  <div id='map' style='width: 100vw; height: 100vh;'></div>
</template>
<script >
export default {
  mounted() {
    goongjs.accessToken = this.GOONG_API_KEY;
    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 8,
    });
    var marker = new goongjs.Marker()
      .setLngLat([105.79449389547807, 21.023262952893536])
      .addTo(map);
  },
  data() {
    return {
      GOONG_API_KEY: import.meta.env.VITE_APP_GOONG_API_KEY,
    }
  }
}
</script>
