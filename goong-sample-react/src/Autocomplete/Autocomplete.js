import React from 'react';
import goongjs from '@goongmaps/goong-js';
import { useEffect } from 'react';
import GoongGeocoder from '@goongmaps/goong-geocoder'

function MyComponent() {
  useEffect(() => {
    goongjs.accessToken = process.env.REACT_APP_GOONG_API_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 9
    });

    map.addControl(
      new GoongGeocoder({
        accessToken: process.env.REACT_APP_GOONG_MAP_KEY,
        goongjs: goongjs
      })
    );
  }, [])

  return (
    <div id='map' style={{ width: '100vw', height: '100vh' }}></div>
  );
}

export default MyComponent;