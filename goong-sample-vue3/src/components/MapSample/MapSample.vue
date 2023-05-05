<template>
  <div id='map' style='width: 100vw; height: 100vh;' ref="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const map = ref()
onMounted(() => {
  goongjs.accessToken = GOONG_API_KEY;
  map.value = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json',
    center: [105.83991, 21.02800],
    zoom: 9
  });
})
const GOONG_API_KEY = import.meta.env.VITE_APP_GOONG_API_KEY
</script>

