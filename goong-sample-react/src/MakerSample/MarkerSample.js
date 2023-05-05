import React, { useState, useEffect, useRef } from 'react';
import goongjs from '@goongmaps/goong-js';

function MarkerSample() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locations, setLocations] = useState([
    {
      key: '1',
      coord: [107.58472, 16.46278],
    },
    {
      key: '2',
      coord: [108.03889, 12.66667],
    },
    {
      key: '3',
      coord: [105.82556, 21.56750],
    },
    {
      key: '4',
      coord: [105.68167, 18.68083],
    },
    {
      key: '5',
      coord: [106.31250, 20.93972],
    },
    {
      key: '6',
      coord: [106.65611, 10.99333],
    },
    {
      key: '7',
      coord: [106.16833, 20.42000],
    },
  ]);
  const [markers, setMarkers] = useState([]);
  const [selectLocation, setSelectLocation] = useState(null);
  const mapRef = useRef(null);

  const handleAddMarker = () => {
    if (!lat || !lng) {
      alert("Please enter locations")
    } else if (selectLocation === null) {
      setLng("")
      setLat("")
      setLocations(a => [...a, { key: (locations.length + 1).toString(), coord: [parseFloat(lng), parseFloat(lat)] }]);
    } else {
      setLng("")
      setLat("")
      setLocations((e) => {
        const newLocations = [...e];
        newLocations.splice(selectLocation, 1, { key: (selectLocation + 1).toString(), coord: [parseFloat(lng), parseFloat(lat)] });
        return newLocations;
      });
    }
    setSelectLocation(null)
  };

  const handleDelete = (index) => {
    setLocations((e) => {
      const newLocations = [...e];
      newLocations.splice(index, 1);
      return newLocations;
    });
  }

  const handleEdit = (key) => {
    let index = locations.indexOf(key)
    setLng(key.coord[0])
    setLat(key.coord[1])
    setSelectLocation(index)
  }

  useEffect(() => {
    goongjs.accessToken = process.env.REACT_APP_GOONG_API_KEY;
    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.83991, 21.02800],
      zoom: 6,
    });
    mapRef.current = map;
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    markers.forEach((marker) => {
      marker.remove();
    });
    const newMarkers = locations.map((location) => {
      return new goongjs.Marker().setLngLat(location.coord).addTo(mapRef.current);
    });
    setMarkers(newMarkers);
  }, [locations]);

  return (
    <div>
      <div id="map" style={{ width: '100vw', height: '100vh' }}>
        <div className="goong-map">
          <div>
            <h1>React Map</h1>
          </div>
          <div>
            <input className="goong-map-input" type="text" value={lng} onChange={(e) => setLng(e.target.value)} />
            <label>Lng</label>
            <input className="goong-map-input" type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
            <label>Lat</label>
            <button className='btn' onClick={handleAddMarker}>Thêm Marker</button>
          </div>
        </div>
        <div className='goong-map-sideBar'>
          {locations.map((number, index) => {
            return (
              <div className='side-bar'>
                <div className='goong-map-coordinates'>
                  <h3 className='goong-map-locations' key={number?.key}>Lng: {number?.coord[0]} Lat: {number?.coord[1]}</h3>
                </div>
                <button className='edit-btn btn' onClick={() => handleEdit(number)} >Sửa</button>
                <button className='delete-btn btn' onClick={() => handleDelete(index)} >Xoá</button>
              </div>)
          }
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkerSample;