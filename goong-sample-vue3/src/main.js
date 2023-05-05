import { createApp } from 'vue'
import App from './App.vue'
import MapSample from './components/MapSample/MapSample.vue'
import MarkerSample from './components/MarkerSample/MarkerSample.vue';
import Autocomplete from './components/Autocomplete/Autocomplete.vue';
import Direction from './components/DirectionSample/DirectionSample.vue'
import { createRouter, createWebHistory } from "vue-router"
import { goongjs } from '@goongmaps/goong-js';
import { GoongGeocoder } from '@goongmaps/goong-geocoder';
import './assets/main.css'
import axios from 'axios';
import VueAxios from 'vue-axios'


const routes = [
    { path: '/', component: MapSample },
    { path: '/marker', component: MarkerSample },
    { path: '/autocomplete', component: Autocomplete },
    { path: '/direction', component: Direction },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
app.use(goongjs)
app.use(VueAxios, axios)
app.use(GoongGeocoder)
app.mount('#app')

