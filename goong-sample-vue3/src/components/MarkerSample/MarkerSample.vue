<template>
  <div id='map' style='width: 100vw ; height: 100vh'>
    <div class="goong-map">
      <div>
        <h1>Vue Map 3</h1>
      </div>
      <div class="goong-map-nav-bar">
        <input type="text" name="long" :value="lng" @input="event => lng = event.target.value">
        <label for="long">Lng</label>
        <input type="text" name="lat" :value="lat" @input="event => lat = event.target.value">
        <label for="lat">Lat</label>
        <button @click="addMarker">Thêm Marker</button>
      </div>
    </div>
    <div class="goong-map-side-bar">
      <div class="goong-map-coordinates" v-for="item, index in locations" :key="item.key">
        <div class="goong-map-locations">
          <h3> Lng:{{ item.coord[0] }} Lat:{{ item.coord[1] }}</h3>
        </div>
        <button class="edit-btn" @click="handleEdit(item, index)">Sửa</button>
        <button class="delete-btn" @click="handleDelete(index)">Xoá</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
onMounted(() => {
  goongjs.accessToken = GOONG_API_KEY;
  map.value = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json',
    center: [105.83991, 21.02800],
    zoom: 9
  });
  initMarker(locations.value)
})
function initMarker(locations) {
  locations.forEach(e => {
    var popup = new goongjs.Popup({ offset: 0 }).setText(
      'Goong Map'
    );
    var el = document.createElement('div');
    el.style.backgroundColor = "red"
    el.style.width = '25px';
    el.style.height = '25px';
    el.style.borderRadius = "50%"
    new goongjs.Marker(el).setLngLat(e.coord).setPopup(popup).addTo(map.value);
    const marker = new goongjs.Marker(el)
      .setLngLat(e.coord)
      .addTo(map.value);
    markers.push(marker)
  })
}
const locations = ref([
  {
    key: '1',
    coord: [107.58472, 16.46278]
  },
  {
    key: '2',
    coord: [105.82556, 21.56750]
  },
  {
    key: '3',
    coord: [105.68167, 18.68083]
  },
  {
    key: '4',
    coord: [106.31250, 20.93972]
  },
  {
    key: '5',
    coord: [106.65611, 10.99333]
  },
  {
    key: '6',
    coord: [106.16833, 20.42000]
  },
  {
    key: '7',
    coord: [105.09028, 10.02083]
  },
])

const lng = ref(null)
const lat = ref(null)
const i = ref(null)
const markers = reactive([])
const GOONG_API_KEY = import.meta.env.VITE_APP_GOONG_API_KEY

function handleDelete(index) {
  if (markers) {
    markers.forEach(marker => {
      marker.remove();
    });
  }
  locations.value.splice(index, 1);
  initMarker(locations.value)
}
function addMarker() {
  if (!lng.value || !lat.value) {
    alert('Please enter locations')
  } else if (i.value === null) {
    locations.value.push({ key: (locations.value.length + 1).toString(), coord: [lng.value, lat.value] });
    initMarker(locations.value)
    lat.value = null;
    lng.value = null

  } else {
    markers.forEach(marker => {
      marker.remove();
    });
    locations.value.splice(i.value, 1, { key: (i.value + 1).toString(), coord: [lng.value, lat.value] });
    initMarker(locations.value)
    lat.value = null;
    lng.value = null;
  }
  return i.value = null
}
function handleEdit(item, index) {
  lng.value = item.coord[0]
  lat.value = item.coord[1];
  i.value = index
}

</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.goong-map {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  gap: 10px;
  z-index: 998;
  padding: 20px 25px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 0.5px solid rgb(221, 221, 221);
}

.goong-map-nav-bar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.goong-map-side-bar {
  display: flex;
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  gap: 10px;
  z-index: 997;
  width: 350px;
  padding-left: 15px;
  padding-top: 20px;
  background-color: white;
  flex-direction: column;
}

.goong-map-coordinates {
  display: flex;
  gap: 10px;
  height: 40px;
  align-items: center;
}

.goong-map-locations {
  width: 220px;
}

input {
  width: 150px;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(54, 148, 255);
  padding-left: 5px;
}

button {
  width: 100px;
  height: 30px;
  color: white;
  border: 1px solid rgb(54, 148, 255);
  background-color: rgb(54, 148, 255);
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  width: 40px;
  height: 30px;
  background-color: red;
  border: 1px solid red;
}

.edit-btn {
  width: 40px;
  height: 30px;
  background-color: orange;
  border: 1px solid orange;
}
</style>
