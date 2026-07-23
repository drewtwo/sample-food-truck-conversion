import 'package:flutter/material.dart';

class FoodTruckApp extends StatelessWidget {
  const FoodTruckApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food Truck App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const FoodTruckHomePage(title: 'Food Truck Dashboard'),
    );
  }
}

class FoodTruckHomePage extends StatefulWidget {
  const FoodTruckHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<FoodTruckHomePage> createState() => _FoodTruckHomePageState();
}

class _FoodTruckHomePageState extends State<FoodTruckHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
