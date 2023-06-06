
## Mapbox Maps SDK Flutter Plugin

Mapbox Maps SDK Flutter Plugin là một giải pháp được phát triển chính thức từ Mapbox cho phép sử dụng sản phẩm Maps SDK mới nhất của chúng tôi (v10.13.0). Nó hiện đang ở giai đoạn thử nghiệm, nhưng có thể được sử dụng trong sản xuất. Plugin cho phép các nhà phát triển nhúng các bản đồ được tùy chỉnh cao bằng tiện ích Flutter trên Android và iOS.  

Web và máy tính để bàn không được hỗ trợ.  

### API được hỗ trợ  

1. Style
2. Camera position
3. Camera animations
4. Events 
5. Gestures 
6. User Location 
7. Circle Layer 
8. Fill Layer 
9. Fill extrusion Layer
10. Line Layer
11. Circle Layer 
12. Raster Layer 
13. Symbol Layer
14. Hillshade Layer
15. Heatmap Layer 
16. Sky Layer 
17. GeoJson Source
18. Image Source
19. Vector Source
20. Raster Source 
21. Rasterdem Source
22. Circle Annotations
23. Point Annotations
24. Line Annotations
25. Fill Annotations


### Yêu cầu

Plugin Maps Flutter tương thích với các ứng dụng:

- Đã triển khai trên iOS 11 trở lên  
- Được xây dựng bằng Android SDK 21 trở lên  
- Được xây dựng bằng Dart SDK 2.17.1 trở lên  

### Cài đặt

#### Cấu hình thông tin đăng nhập
Để chạy Plugin Maps Flutter, bạn sẽ cần định cấu hình Mã thông báo truy cập Mapbox.  
Đọc thêm về access public tokens và access secret tokens tại tài liệu nền tảng [Android](https://docs.mapbox.com/android/maps/guides/install/#configure-credentials) hoặc [iOS](https://docs.mapbox.com/ios/maps/guides/install/#configure-credentials).  

##### Secret token
Để truy cập SDK nền tảng, bạn sẽ cần tạo mã thông báo truy cập bí mật với phạm vi `Downloads:Read` và sau đó:  
 - để tải xuống SDK Android, hãy thêm cấu hình mã thông báo vào `~/.gradle/gradle.properties` : 
```
  SDK_REGISTRY_TOKEN=YOUR_SECRET_MAPBOX_ACCESS_TOKEN
```
 - để tải xuống SDK iOS, hãy thêm cấu hình mã thông báo vào `~/.netrc` :
```
  machine api.mapbox.com
  login mapbox
  password YOUR_SECRET_MAPBOX_ACCESS_TOKEN
```

##### Public token
Để khởi tạo tiện ích `MapWidget`, hãy chuyển mã thông báo truy cập công khai bằng `ResourceOptions`:
```
  MapWidget(
    resourceOptions:
        ResourceOptions(accessToken: PUBLIC_ACCESS_TOKEN))));
```

Sau đó, để lấy mã thông báo từ môi trường trong ứng dụng:  
```
String ACCESS_TOKEN = String.fromEnvironment("PUBLIC_ACCESS_TOKEN");
```

#### Thêm plugin
Để sử dụng Plugin Maps Flutter, hãy thêm phần phụ thuộc git vào `pubspec.yaml`:

```
dependencies:
  mapbox_maps_flutter: ^0.4.4
```

#### Hiển thị bản đồ
Cài `mapbox_maps_flutter` và thêm bản đồ:
```
import 'package:flutter/material.dart';
import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';

void main() {
  runApp(MaterialApp(
      home: MapWidget(
          resourceOptions: ResourceOptions(accessToken: YOUR_ACCESS_TOKEN))));
}
```

##### MapWidget widget
Tiện ích `MapWidget` cung cấp các tùy chọn để tùy chỉnh bản đồ - bạn có thể đặt `ResourceOptions`, `MapOptions`, `CameraOptions`, `styleURL`. 

Nó cũng cho phép hoặc thêm các sự kiện khác nhau - liên quan đến tải kiểu, hiển thị bản đồ, tải bản đồ.

##### MapboxMap controller
Phiên bản bộ điều khiển `MapboxMap` được cung cấp với hàm gọi lại `MapWidget.onMapCreated`.  

`MapboxMap` hiển thị một điểm vào cho hầu hết các API mà Plugin Maps Flutter cung cấp. Nó cho phép kiểm soát bản đồ, máy ảnh, phong cách, quan sát các sự kiện bản đồ,
các tính năng kết xuất truy vấn, v.v.


Để tương tác với bản đồ sau khi nó được tạo, hãy lưu trữ đối tượng MapboxMap ở đâu đó:   
```
class FullMap extends StatefulWidget {
  const FullMap();

  @override
  State createState() => FullMapState();
}

class FullMapState extends State<FullMap> {
  MapboxMap? mapboxMap;

  _onMapCreated(MapboxMap mapboxMap) {
    this.mapboxMap = mapboxMap;
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: MapWidget(
      key: ValueKey("mapWidget"),
      resourceOptions: ResourceOptions(accessToken: ACCESS_TOKEN),
      onMapCreated: _onMapCreated,
    ));
  }
}
```
### Kiểu bản đồ
Tài liệu nền tảng : [Android](https://docs.mapbox.com/android/maps/guides/styles/), [iOS](https://docs.mapbox.com/ios/maps/guides/styles/).

Mapbox Maps Flutter Plugin cho phép tùy chỉnh đầy đủ giao diện của bản đồ được sử dụng trong ứng dụng của bạn.

#### Chỉ định kiểu bản đồ
Bạn có thể chỉ định uri kiểu ban đầu tại `MapWidget.styleUri` hoặc tải nó khi chạy bằng cách sử dụng `MapboxMap.loadStyleURI` / `MapboxMap.loadStyleJson` :  

```
  mapboxMap.loadStyleURI(Styles.DARK);
```

### Markers and annotations  
Tài liệu nền tảng : [Android](https://docs.mapbox.com/android/maps/guides/annotations/), [iOS](https://docs.mapbox.com/ios/maps/guides/annotations/).

Bạn có một số tùy chọn để thêm chú thích trên bản đồ.  

1. Sử dụng API AnnotationManager để tạo chú thích hình tròn/điểm/đa giác/đa tuyến.   

Tạo 6 marker bằng CircleAnnotation: 

```Dart
  List<dynamic> Coordinates = [
    {'id': 1, 'lng': 105.8342, 'lat': 21.0278},
    {'id': 2, 'lng': 106.68028, 'lat': 20.86194},
    {'id': 3, 'lng': 106.31250, 'lat': 20.93972},
    {'id': 4, 'lng': 106.16833, 'lat': 20.42000},
    {'id': 5, 'lng': 106.33750, 'lat': 20.44750},
    {'id': 6, 'lng': 106.05639, 'lat': 21.18528},
  ];

  mapboxMap?.annotations.createCircleAnnotationManager().then((value) async {
      _circleAnnotationManager = value;
      for (var coordinate in Coordinates) {
        final id = coordinate['id'];
        final lng = coordinate['lng'];
        final lat = coordinate['lat'];

        final options = CircleAnnotationOptions(
          geometry: Point(coordinates: Position(lng, lat)).toJson(),
          circleColor: Colors.blue.value,
          circleRadius: 12.0,
        );

        await value.create(options);
      }
    });
```
### Autocomplete 

Sử dụng Goong API để tìm kiếm, những gợi ý tìm kiếm sẽ được đưa ra nhanh chóng và chính xác.  

1. Sử dụng Goong API để tìm kiếm `https://rsapi.goong.io/Place/AutoComplete?api_key={YOUR_API_KEY}&input=$input`  
2. Sử dụng API AnnotationManager để tạo marker khi tìm kiếm địa điểm.  


```Dart
 Future<void> fetchData(String input) async {
    try {
      final url = Uri.parse(
        'https://rsapi.goong.io/Place/AutoComplete?api_key={YOUR_API_KEY}&input=$input');
      var response = await http.get(url);
      setState(() {
        final jsonResponse = jsonDecode(response.body);
        places = jsonResponse['predictions'] as List<dynamic>;
        _circleAnnotationManager?.deleteAll();
        isShow = true;
        isHidden = true;
      });
    } catch (e) {
      // ignore: avoid_print
      print('$e');
    }
  }

  Widget _buildListView() {
    return ListView.builder(
      itemCount: places.length,
      itemBuilder: (context, index) {
        final coordinate = places[index];

        return ListTile(
          horizontalTitleGap: 5,
          title: Row(
            children: [
              const Icon(
                Icons.location_on_outlined,
                color: Colors.blue,
                size: 20,
              ),
            SizedBox(
              width: 320,
              child:Text(
                coordinate['description'],
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
                style: const TextStyle(
                  color: Colors.black54,
                ),
            ),)

          ],),onTap: ()async{
                setState(() {
                  isShow = false;
                  isHidden= false;
                });

          final url = Uri.parse(
              'https://rsapi.goong.io/geocode?address=${coordinate['description']}&api_key={YOUR_API_KEY}');
          var response = await http.get(url);
            final jsonResponse = jsonDecode(response.body);
            details = jsonResponse['results'] as List<dynamic>;

          // ignore: no_leading_underscores_for_local_identifiers
            mapboxMap?.setCamera(CameraOptions(
                center: Point(coordinates: Position(details[index]['geometry']['location']['lng'],details[index]['geometry']['location']['lat'])).toJson(),
                zoom: 12.0));

          mapboxMap?.flyTo(
              CameraOptions(
                  anchor: ScreenCoordinate(x: 0, y: 0),
                  zoom: 15,
                  bearing: 0,
                  pitch: 0),
              MapAnimationOptions(duration: 2000, startDelay: 0));
          mapboxMap?.annotations.createCircleAnnotationManager().then((value) async {
              setState(() {
                _circleAnnotationManager = value; // Store the reference to the circle annotation manager
              });

            value.create(CircleAnnotationOptions(
                geometry: Point(
                    coordinates: Position(
                      details[index]['geometry']['location']['lng'],
                      details[index]['geometry']['location']['lat'],
                    )).toJson(),
              circleColor: Colors.blue.value,
              circleRadius: 12.0,),
            );
          });
          _searchController.text = coordinate['description'];
          mainText = coordinate['structured_formatting']['main_text'];
          secondText = coordinate['structured_formatting']['secondary_text'];
        },
        );},
    );
  }

```

### Dẫn đường

Tìm kiếm quãng đường di chuyển giữa hai điểm một cách thuận tiện và nhanh nhất.

1. Sử dụng Goong API để tìm kiếm quãng đường: `https://rsapi.goong.io/Direction?origin=$latStart,$lngStart&destination=$latEnd,$lngEnd&vehicle=bike&api_key={YOUR_API_KEY}`
2. Giá trị đầu vào là toạ độ điểm bắt đầu và điểm kết thúc


``` Dart
 final url = Uri.parse(
    'https://rsapi.goong.io/Direction?origin=$latStart,$lngStart&destination=$latEnd,$lngEnd&vehicle=bike&api_key={YOUR_API_KEY}');
 mapboxMap?.setBounds(CameraBoundsOptions(
          bounds: CoordinateBounds(
              southwest: Point(
                  coordinates: Position(
                    lngStart!,
                    latStart!,
                  )).toJson(),
              northeast: Point(
                  coordinates: Position(
                    lngEnd!,
                    latEnd!,
                  )).toJson(),
              infiniteBounds: true),
          maxZoom: 13,
          minZoom: 0,
          maxPitch: 10,
          minPitch: 0));

      var response = await http.get(url);
      final jsonResponse = jsonDecode(response.body);
      var route  = jsonResponse['routes'][0]['overview_polyline']['points'];
      duration = jsonResponse['routes'][0]['legs'][0]['duration']['text'];
      distance = jsonResponse['routes'][0]['legs'][0]['distance']['text'];
      List<PointLatLng> result = polylinePoints.decodePolyline(route);
      List<List<double>> coordinates = result.map((point) => [point.longitude, point.latitude]).toList();

      String geojson =
      '''{
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Crema to Council Crest"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": $coordinates
          }
        }
      ]
    }''';

      await mapboxMap?.style.addSource(GeoJsonSource(id: "line", data: geojson));
      var lineLayerJson = """{
          "type":"line",
          "id":"line_layer",
          "source":"line",
          "paint":{
          "line-join":"round",
          "line-cap":"round",
          "line-color":"rgb(51, 51, 255)",
          "line-width":9.0
          }
        }""";

      await mapboxMap?.style.addPersistentStyleLayer(lineLayerJson, null);
    
```
