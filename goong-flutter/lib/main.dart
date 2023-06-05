import 'package:flutter/material.dart';

import 'direction.dart';
import 'simplemap.dart';
import 'marker.dart';
import 'autocomplete.dart';
import 'safearea.dart';

void main() {
  runApp(const MaterialApp(debugShowCheckedModeBanner: false, home: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Goong Map Sample')),
      body: ListView(children: [
        const Padding(padding: EdgeInsets.only(top: 25)),
        Column(
          children: [
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(240, 80),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const SimpleMap()));
              },
              child:
                  const Text('Display a Map', style: TextStyle(fontSize: 28)),
            ),
            const Padding(padding: EdgeInsets.only(top: 25)),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(240, 80),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const MarkerMap()));
              },
              child: const Text('Add a Marker', style: TextStyle(fontSize: 28)),
            ),
            const Padding(padding: EdgeInsets.only(top: 25)),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(240, 80),
              ),
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const AutocompleteMap()));
              },
              child: const Text('Autocomplete', style: TextStyle(fontSize: 28)),
            ),
            const Padding(padding: EdgeInsets.only(top: 25)),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(240, 80),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const FullMap()));
              },
              child: const Text('Direction', style: TextStyle(fontSize: 28)),
            ),
            const Padding(padding: EdgeInsets.only(top: 25)),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(240, 80),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const SafeAreaMap()));
              },
              child: const Text('Safe Area', style: TextStyle(fontSize: 28)),
            ),
          ],
        )
      ]),
    );
  }
}
