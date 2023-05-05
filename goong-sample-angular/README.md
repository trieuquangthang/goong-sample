
# Angular Sample

Các bước thiết lập chung
1. Tải source code
2. Yêu cầu phiên bản Node.js >=15.0.0
3. Cài đặt package theo câu lệnh dưới đây
`npm install --save @goongmaps/goong-js`  
4. Nhúng `link` và `script`  dưới đây vào thẻ `<head>` của file `index.html` 
`<script src='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.js'></script>`  
`<link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.css' rel='stylesheet' />`  


###### MapSample

5. Khởi tạo bản đồ

```Typescript
 goongjs.accessToken = { YOUR_API_KEY };
  var map = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json',
    center: [105.83991, 21.02800],
    zoom: 9
    });
```
> _`goongjs.accessToken = { YOUR_API_KEY }: Nhập  key mà bạn đã đăng ký vào đây`_
> _`new goongjs.Map(): Khởi tạo bản đồ`_
> _`center: Vị trí ban đầu khi bản đồ được tải lên`_
> _`zoom: Độ phóng to của bản đồ`_

###### Autocomplete

5. Khởi tạo bản đồ
6. Cài đặt thêm package theo câu lệnh dưới đây
`npm add @goongmaps/goong-geocoder`  
7. Nhúng `link` và `script`  dưới đây vào thẻ `<body>` của file `index.html`
`<script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder@1.1.1/dist/goong-geocoder.min.js"></script>`  
`<link href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder@1.1.1/dist/goong-geocoder.css" rel="stylesheet" type="text/css" />`  
`<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>`  
`<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>`  
8. Khởi tạo search box

```Typescript
 map.addControl(
   new GoongGeocoder({
   accessToken: { YOUR_MAPTILES_KEY },
   goongjs: goongjs
      })
    );
```
> _`accessToken: { YOUR_MAPTILES_KEY }: Nhập  key mà bạn đã đăng ký vào đây`_  
> _`new GoongGeocoder() : Khởi tạo search box`_  


###### MarkerSample
5. Khởi tạo bản đồ
6. Khởi tạo Marker trên bản đồ
- Khai báo locations

```Typescript
locations = [
    {
      key: '1',
      coord: [107.58472, 16.46278]
    },
    {
      key: '2',
      coord: [105.82556, 21.56750]
    },
    ...
  ];
```
> _`locations: Một mảng bao gồm các đối tượng mà trong các đối tượng đó có chứa kinh độ và vĩ độ được dùng để đặt Marker trên bản đồ.`_  

- Khởi tạo Marker

```Typescript
initMarker(locations: any) {
    locations.forEach((e: any) => {
      const marker = new goongjs.Marker()
        .setLngLat(e.coord)
        .addTo(this.map);
      this.markers.push(marker);
    });
  }
```

> _`new goongjs.Marker(): Khởi tạo Marker.`_  
> _`setLngLat(): Truyền kinh độ vĩ độ cho Marker.`_  
> _`addTo(): Gán Marker lên bản đồ.`_  


- Thêm Marker

```Typescript
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
```
> _`Nếu người dùng không nhập kinh độ và vĩ độ thì sẽ có thông báo "Please enter locations", khi người dùng nhập kinh độ, vĩ độ vào ô Input, sẽ có hai trường hợp xảy ra:`_  
> _`Trường hợp 1: Người dùng thêm mới (this.index === null)`_  
> _`Trường hợp 2: Người dùng sửa (this.index !== null)`_  

- Sửa Marker

```Typescript
handleEdit(locations: any): void {
    let i: number = this.locations.indexOf(locations)
    this.index = i
    this.lng = locations.coord[0]
    this.lat = locations.coord[1]
    console.log(this.index)
  }
```
> _`Tham số truyền vào là key giúp cho người dùng lấy được vị trí của Marker cần sửa, sau đó dùng phương thức splice() để sửa (Trường hợp 2 đã nêu bên trên)`_  
- Xoá Marker

```Typescript
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
```
> _`Tham số truyền vào là index giúp cho người dùng lấy được vị trí của Marker cần xoá, sau đó dùng phương thức splice() để xoá.`_  

###### DirectionSample
5. Khởi tạo bản đồ
6. Cài đặt thêm package theo câu lệnh dưới đây
`npm install @mapbox/polyline`
`npm install @goongmap/goong-sdk`
`npm install axios`
7. Các tham số cần thiết
   
- Khai báo biến 
```Typescript
  startPoint: string = "";
  endPoint: string = "";
```
> _`"origin" và "destination" là Object chứa toạ độ của điểm đầu và điểm cuối`_  
> _`"startPoint" và "endPoint" là địa điểm mà người dùng nhập vào`_  


- Kinh độ, vĩ độ của điểm bắt đầu và điểm kết thúc
```Typescript
const [originRes, destRes] = await Promise.all([
    axios.get(`${this.url}=${this.startPoint}&api_key=${environment.ANGULAR_APP_GOONG_MAP_KEY}`),
    axios.get(`${this.url}=${this.endPoint}&api_key=${environment.ANGULAR_APP_GOONG_MAP_KEY}`)
  ]);
  const origin = originRes.data.results[0].geometry.location;
  const destination = destRes.data.results[0].geometry.location;
  this.direction({ origin, destination });
```

> _`Sử dụng Method: GET và URL: "https://rsapi.goong.io/geocode?address={YOUR_LOCATION}&api_key={YOUR_API_KEY}" để lấy toạ độ của điểm đầu và điểm kết thúc.`_  
> _`"YOUR_LOCATION" chính là "startPoint" và "endPoint" được khai báo ban đầu, sau khi người dùng nhập địa điểm cần tìm server sẽ trả về toạ độ, sau đó sẽ được gán vào hai biến là "origin" và "destination"`_  

8. Truyền toạ độ điểm đầu và điểm cuối để vẽ tuyến đường qua 2 điểm

```Typescript
const originPlace = point.origin
const destinationPlace = point.destination
...
directionService
    .getDirections({
    // Truyền tham số vào đây
      origin: `${originPlace.lat},${originPlace.lng}`,
      destination: `${destinationPlace.lat},${destinationPlace.lng}`,
      vehicle: 'car'
    })
    .send()
    .then(function (response:any):void {
    // Dữ liệu của tuyến đường được trả về
       var directions = response.body;
       var route = directions.routes[0];
       var geometry_string = route.overview_polyline.points;
       var geoJSON = polyline.toGeoJSON(geometry_string);
    // Bản đồ sẽ tiếp nhận dữ liệu
         map.addSource('route', {
            'type': 'geojson',
            'data': geoJSON
          });
    // Tuyến đường sẽ được vẽ trên bản đồ với các thông số dưới đây
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
                'line-color': 'rgb(0, 153, 255)',
                'line-width': 8
              }
            },
            firstSymbolId
          );
        })
```