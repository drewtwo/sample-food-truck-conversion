import 'package:flutter/material.dart';

void main() {
  runApp(const FoodTruckApp());
}

class FoodTruckApp extends StatelessWidget {
  const FoodTruckApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food Truck App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Food Truck App'),
      ),
      body: const Center(
        child: Text('Welcome to Food Truck App'),
      ),
    );
  }
}
