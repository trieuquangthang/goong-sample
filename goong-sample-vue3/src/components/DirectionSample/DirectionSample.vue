<template>
  <div id='map' style='width: 100vw ; height: 100vh'>
    <div class="goong-map">
      <div>
        <h1>Vue 3 Map</h1>
      </div>
      <div class="goong-map-search">
        <input type="text" name="lng" :value="startPoint" @input="event => startPoint = event.target.value"
          placeholder="Điểm bắt đầu">
        <input type="text" name="lat" :value="endPoint" @input="event => endPoint = event.target.value"
          placeholder="Điểm kết thúc">
        <button @click="handleSearch()">Tìm kiếm</button>
      </div>
    </div>
  </div>
</template>
<script setup >
import goongjs from '@goongmaps/goong-js';
import { onMounted, ref } from 'vue';
import polyline from '@mapbox/polyline';
import goongClient from '@goongmaps/goong-sdk';
import goongDirections from '@goongmaps/goong-sdk/services/directions';
import axios from "axios"
const baseClient = goongClient({ accessToken: import.meta.env.VITE_APP_GOONG_MAP_KEY });
const directionService = goongDirections(baseClient);

onMounted(() => {
  goongjs.accessToken = GOONG_API_KEY;
  mapRef.value = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json',
    center: [105.83991, 21.02800],
    zoom: 8,
  });
});

const startPoint = ref("")
const endPoint = ref("")
const mapRef = ref(null)
const GOONG_API_KEY = import.meta.env.VITE_APP_GOONG_API_KEY
const GOONG_MAP_KEY = import.meta.env.VITE_APP_GOONG_MAP_KEY
const url = 'https://rsapi.goong.io/geocode?address'


function direction(point) {
  const map = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json',
    center: [105.83991, 21.02800],
    zoom: 12,
  });
  mapRef.value = map

  map.on('load', function () {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    const originPlace = point.origin
    const destinationPlace = point.destination

    if (originPlace) {
      var el = document.createElement('div');
      el.style.backgroundColor = "red"
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = "50%"
      var marker = new goongjs.Marker(el)
        .setLngLat([originPlace.lng, originPlace.lat])
        .addTo(map);
    }
    if (destinationPlace) {
      var marker = new goongjs.Marker()
        .setLngLat([destinationPlace.lng, destinationPlace.lat])
        .addTo(map);
    }
    map.flyTo({
      center: [originPlace.lng, originPlace.lat],
      essential: true
    });
    directionService
      .getDirections({
        origin: `${originPlace.lat},${originPlace.lng}`,
        destination: `${destinationPlace.lat},${destinationPlace.lng}`,
        vehicle: 'car'
      })
      .send()
      .then(function (response) {
        var directions = response.body;
        var route = directions.routes[0];

        var geometry_string = route.overview_polyline.points;
        var geoJSON = polyline.toGeoJSON(geometry_string);
        map.addSource('route', {
          'type': 'geojson',
          'data': geoJSON
        });

        map.addLayer(
          {
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#1e88e5',
              'line-width': 8
            }
          },
          firstSymbolId
        );
      })
  })
}

async function handleSearch() {
  if (!startPoint || !endPoint) {
    alert("Please enter locations")
  } else {
    try {
      const [originRes, destRes] = await Promise.all([
        axios.get(`${url}=${startPoint.value}&api_key=${GOONG_MAP_KEY}`),
        axios.get(`${url}=${endPoint.value}&api_key=${GOONG_MAP_KEY}`)
      ]);
      const origin = originRes.data.results[0].geometry.location;
      const destination = destRes.data.results[0].geometry.location;
      mapRef.value.remove();
      direction({ origin, destination });
    } catch (e) {
      console.log(e)
    }
  }
}

</script>
<style scoped>
.goong-map {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  gap: 10px;
  padding: 20px 25px;
  align-items: center;
  z-index: 999;
  background-color: white;
  border: 0.5px solid rgb(221, 221, 221);
  justify-content: space-between;
}

.goong-map-search {
  display: flex;
  gap: 10px;
}

input {
  width: 200px;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(56, 119, 255);
  padding-left: 5px;
}

button {
  width: 100px;
  height: 30px;
  border: 1px solid rgb(54, 148, 255);
  color: white;
  background-color: rgb(54, 148, 255);
  border-radius: 5px;
  cursor: pointer;
}
</style>