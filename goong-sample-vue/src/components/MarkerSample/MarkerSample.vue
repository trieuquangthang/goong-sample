<template>
  <div id='map'>
    <div class="goong-map">
      <div>
        <h1>Vue Map</h1>
      </div>
      <div class="goong-map-nav-bar">
        <input type="text" name="lng" :value="lng" @input="event => lng = event.target.value">
        <label for="lng">Lng</label>
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
        <button class="delete-btn" @click="handleDelete(item)">Xoá</button>
      </div>
    </div>
  </div>
</template>
<script>
import goongjs from '@goongmaps/goong-js';
export default {
  mounted() {
    goongjs.accessToken = this.GOONG_API_KEY;
    this.map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 8,
    });
    this.initMarker(this.locations);
  },
  data() {
    return {
      initMarker(location) {
        location.forEach(e => {
          const marker = new goongjs.Marker()
            .setLngLat(e.coord)
            .addTo(this.map);
          this.markers.push(marker)
        })
      },
      GOONG_API_KEY: import.meta.env.VITE_APP_GOONG_API_KEY,
      lng: null,
      lat: null,
      locations: [
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
      ],
      map: null,
      i: null,
      markers: []
    }
  },
  methods: {
    addMarker() {
      if (!this.lng || !this.lat) {
        alert('Please enter locations')
      } else if (this.i === null) {
        this.markers.forEach(marker => {
          marker.remove();
        });
        console.log(`add`, this.i)
        this.locations.push({ key: (this.locations.length + 1).toString(), coord: [parseFloat(this.lng), parseFloat(this.lat)] });
        this.lat = null;
        this.lng = null;
        this.initMarker(this.locations);

      } else {
        this.markers.forEach(marker => {
          marker.remove();
        });
        this.locations.splice(this.i, 1, { key: (this.i + 1).toString(), coord: [parseFloat(this.lng), parseFloat(this.lat)] });
        this.initMarker(this.locations);
        this.lat = null;
        this.lng = null;
      }
      return this.i = null
    },

    handleDelete(item) {
      let index = this.locations.indexOf(item)
      this.i = index
      if (this.markers) {
        this.markers.forEach(marker => {
          marker.remove();
        });
      }
      this.locations.splice(this.i, 1);
      this.initMarker(this.locations);
    },

    handleEdit(item, index) {
      this.lng = item.coord[0]
      this.lat = item.coord[1];
      this.i = index

    },
  }
};
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