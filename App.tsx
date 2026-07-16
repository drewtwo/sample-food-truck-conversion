import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppContextProvider } from './src/store/AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <View style={styles.container}>
        <Text>Welcome to Food Truck App!</Text>
        <StatusBar style="auto" />
      </View>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
