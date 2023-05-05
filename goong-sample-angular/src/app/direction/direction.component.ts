import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
const goongjs = require('node_modules/@goongmaps/goong-js')
const goongClient = require('@goongmaps/goong-sdk');
const goongDirections = require('@goongmaps/goong-sdk/services/directions');
const polyline = require('@mapbox/polyline');
const baseClient = goongClient({ accessToken: `${environment.ANGULAR_APP_GOONG_MAP_KEY}` });
const directionService = goongDirections(baseClient);
const axios = require('axios');

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent {

  map: any = null;
  startPoint: string = "";
  endPoint: string = "";
  url: any = 'https://rsapi.goong.io/geocode?address';

  direction(point: any): void {
    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 12,
    });
    this.map = map

    map.on('load', function () {
      var layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId: any;
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
        .then(function (response: any): void {
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

  async handleSearch() {
    if (!this.startPoint || !this.endPoint) {
      alert("Please enter locations")
    } else {
      try {
        const [originRes, destRes] = await Promise.all([
          axios.get(`${this.url}=${this.startPoint}&api_key=${environment.ANGULAR_APP_GOONG_MAP_KEY}`),
          axios.get(`${this.url}=${this.endPoint}&api_key=${environment.ANGULAR_APP_GOONG_MAP_KEY}`)
        ]);
        const origin = originRes.data.results[0].geometry.location;
        const destination = destRes.data.results[0].geometry.location;
        this.map.remove();
        this.direction({ origin, destination });
      } catch (e) {
        console.log(e)
      }
    }
  }

  ngOnInit() {
    goongjs.accessToken = environment.ANGULAR_APP_GOONG_API_KEY;
    this.map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 6
    });
  }
}
