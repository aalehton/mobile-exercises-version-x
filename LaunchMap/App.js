import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App: () => Node = () => {
  const [latitude, setLatitude] = useState(0);
const [longitude, setLongitude] = useState(0);

const launchMap = () => {
  const location = `${latitude},${longitude}`
  const url = Platform.select({
    ios: `maps:${location}`,
    android: `geo:${location}?center=${location}&q=${location}&z=16`,
  });
  Linking.openURL(url);
}

return (
  <SafeAreaProvider>
    <View style={styles.banner}>
      <Text style={{textAlign: "center", padding: 30, color: "green"}}>Launch a Map!</Text>
    </View>
    <ScrollView  style={{marginLeft: 15}}>
      <View>
        <Text>
          Give a latitude:
        </Text>
        <TextInput placeholder="Latitude" onChangeText={text => setLatitude(text)}></TextInput>
        <Text>
          Give a longitude:
        </Text>
        <TextInput placeholder="Longitude" onChangeText={text => setLongitude(text)}></TextInput>
      </View>
      <View style={{marginBottom: 40, marginTop: 20}}>
        <Text> You gave: {latitude} for a latitude.</Text>
        <Text style={{marginLeft: 5}}>You gave: {longitude} for a longitude.</Text>
      </View>
      <View style={{width: 300, marginLeft: 30}}>
      <Button title="Launch a Map"color="#CBBF0C" onPress={launchMap}></Button>
      </View>
    </ScrollView>
  </SafeAreaProvider>


const styles = StyleSheet.create({
  banner: {
    marginBottom: 22,
    backgroundColor: "#09DB0C",
  },
});


export default App;
