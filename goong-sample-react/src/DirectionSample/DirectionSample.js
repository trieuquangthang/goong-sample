
import React, { useEffect, useRef, useState } from 'react';
import goongjs from '@goongmaps/goong-js';
import polyline from '@mapbox/polyline';
import axios from 'axios';

function MapWithDirections() {
  const goongClient = require('@goongmaps/goong-sdk');
  const goongDirections = require('@goongmaps/goong-sdk/services/directions');
  const baseClient = goongClient({ accessToken: `${process.env.REACT_APP_GOONG_MAP_KEY}` });
  const directionService = goongDirections(baseClient);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [startPoint, setStartPoint] = useState("")
  const [endPoint, setEndPoint] = useState("")
  const mapRef = useRef(null);
  const [center, setCenter] = useState([105.80278, 20.99245])
  const url = "https://rsapi.goong.io/geocode?address"

  const handleSearch = async () => {
    if (!startPoint || !endPoint) {
      alert("Please enter locations")
    } else {
      try {
        await axios.get(`${url}=${startPoint}&api_key=${process.env.REACT_APP_GOONG_MAP_KEY}`)
          .then(res => {
            const points = res.data;
            setOrigin(points.results[0].geometry.location);
          })
          .catch(error => console.log(error));

        await axios.get(`${url}=${endPoint}&api_key=${process.env.REACT_APP_GOONG_MAP_KEY}`)
          .then(res => {
            const points = res.data;
            setDestination(points.results[0].geometry.location);
          })
          .catch(error => console.log(error));
      } catch (e) {
        console.log(e)
      }
    }
  };

  useEffect(() => {
    goongjs.accessToken = process.env.REACT_APP_GOONG_API_KEY;
    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: center,
      zoom: 12,
    });

    mapRef.current = map
    return () => {
      map.remove();
    };
  }, [origin, destination])


  useEffect(() => {

    mapRef.current.on('load', function () {
      var layers = mapRef.current.getStyle().layers;

      var firstSymbolId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      if (origin) {
        var el = document.createElement('div');
        el.style.backgroundColor = "red"
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = "50%"
        var marker = new goongjs.Marker(el)
          .setLngLat([origin.lng, origin.lat])
          .addTo(mapRef.current);
      }
      if (destination) {
        var marker = new goongjs.Marker()
          .setLngLat([destination.lng, destination.lat])
          .addTo(mapRef.current);
      }
      mapRef.current.flyTo({
        center: [origin.lng, origin.lat],
        essential: true
      });
      directionService
        .getDirections({
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          vehicle: 'car'
        })
        .send()
        .then(function (response) {
          var directions = response.body;
          var route = directions.routes[0];

          var geometry_string = route.overview_polyline.points;
          var geoJSON = polyline.toGeoJSON(geometry_string);
          mapRef.current.addSource('route', {
            'type': 'geojson',
            'data': geoJSON
          });
          mapRef.current.addLayer(
            {
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': 'rgb(0, 153, 255)',
                'line-width': 8
              }
            },
            firstSymbolId
          );
        })
    });
  }, [origin, destination])


  return (
    <div id="map" >
      <div className="goong-map-search">
        <div>
          <h1>React Map</h1>
        </div>
        <div className="goong-map-direction">
          <input type="text" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} placeholder='Điểm bắt đầu' />
          <input type="text" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} placeholder='Điểm kết thúc' />
          <button className='btn' onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
}

export default MapWithDirections;