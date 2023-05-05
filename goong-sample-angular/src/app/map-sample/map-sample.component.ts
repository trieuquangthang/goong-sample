import { Component } from '@angular/core';
const goongjs = require('node_modules/@goongmaps/goong-js')
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map-sample',
  templateUrl: './map-sample.component.html',
  styleUrls: ['./map-sample.component.css']
})
export class MapSampleComponent {
  ngOnInit() {
    goongjs.accessToken = environment.ANGULAR_APP_GOONG_API_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 6
    });
  }
}
