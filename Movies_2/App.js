import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from "react-native-webview";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import MoviePlay from './MoviePlay';

const Stack = createStackNavigator();

  function App() {
    /*Show the list and the details of the movies*/ 
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MoviesList" component={MovieListScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const itemPressed = (index) => {
    alert(index);
  }
  
  export default App;
