import { Component } from '@angular/core';
const goongjs = require('node_modules/@goongmaps/goong-js')
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-marker-sample',
  templateUrl: './marker-sample.component.html',
  styleUrls: ['./marker-sample.component.css'],
})

export class MarkerSampleComponent {
  locations = [
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
  ];
  lng: any = null;
  lat: any = null;
  map: any = null;
  index: any = null;
  markers: Array<any> = [];

  addMarker() {
    if (!this.lng || !this.lat) {
      alert("Please enter locations")
    } else if (this.index === null) {
      this.markers.forEach(marker => {
        marker.remove();
      });
      this.markers = [];
      this.locations.push({ key: (this.locations.length + 1).toString(), coord: [parseInt(this.lng), parseInt(this.lat)] });
      this.lat = null;
      this.lng = null;
      this.initMarker(this.locations);
    } else {
      this.markers.forEach(marker => {
        marker.remove();
      });
      this.markers = [];
      this.locations.splice(this.index, 1, { key: (this.index + 1).toString(), coord: [parseFloat(this.lng), parseFloat(this.lat)] });
      this.lat = null;
      this.lng = null;
      this.initMarker(this.locations);
    }
    this.index = null
  }

  handleEdit(locations: any): void {
    let i: number = this.locations.indexOf(locations)
    this.index = i
    this.lng = locations.coord[0]
    this.lat = locations.coord[1]
    console.log(this.index)
  }

  handleDelete(locations: any) {
    let i: number = this.locations.indexOf(locations)
    this.index = i
    if (this.markers) {
      this.markers.forEach(marker => {
        marker.remove();
      });
    }
    this.locations.splice(this.index, 1);
    this.initMarker(this.locations);
  }

  ngOnInit() {
    goongjs.accessToken = environment.ANGULAR_APP_GOONG_API_KEY;
    this.map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 6
    });
    this.initMarker(this.locations);
  }

  initMarker(locations: any) {
    locations.forEach((e: any) => {
      const marker = new goongjs.Marker()
        .setLngLat(e.coord)
        .addTo(this.map);
      this.markers.push(marker);
    });
  }

}
