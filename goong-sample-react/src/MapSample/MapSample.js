import React from 'react';
import goongjs from '@goongmaps/goong-js';
import { useEffect } from 'react';
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode
} from 'mapbox-gl-draw-circle';



function MapSample() {
  useEffect(() => {
    goongjs.accessToken = process.env.REACT_APP_GOONG_API_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 9
    });

    const draw = new goongjs.Map({
      defaultMode: "draw_circle",
      userProperties: true,
      modes: {
        draw_circle: CircleMode,
        drag_circle: DragCircleMode,
        direct_select: DirectMode,
        simple_select: SimpleSelectMode
      }
    });

    // Add this draw object to the map when map loads
    map.addControl(draw);
    draw.changeMode('draw_circle', { initialRadiusInKm: 0.5 });
  })


  return (
    <div id='map' style={{ width: '100vw', height: '100vh' }}>
    </div>
  );
}

export default MapSample;