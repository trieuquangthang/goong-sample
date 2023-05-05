import { Component } from '@angular/core';
const goongjs = require('node_modules/@goongmaps/goong-js')
const GoongGeocoder = require('@goongmaps/goong-geocoder');
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {

  ngOnInit() {
    goongjs.accessToken = environment.ANGULAR_APP_GOONG_API_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 6
    });
    map.addControl(
      new GoongGeocoder({
        accessToken: environment.ANGULAR_APP_GOONG_MAP_KEY,
        goongjs: goongjs
      })
    );
  }
}
