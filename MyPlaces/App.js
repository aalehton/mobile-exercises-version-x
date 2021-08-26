import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Button} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dialog from "react-native-dialog";
import { Header, Card} from 'react-native-elements';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps'

const App: () => Node = () => {

  const [staticData, setStaticdata] = useState ([]);

  const [modalVisible, setModalVisible] = useState(false); 
  const [modalVisible2, setModalVisible2] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);
const [lat, setLat] = useState(66.4945);
  const [lon, setLon] = useState(25.7713);

  const [region, setRegion] = useState({
    latitude: 66.4945000,
    longitude: 25.7713333,
    latitudeDelta: 15,
    longitudeDelta: 0.121,
  });

  const openDialog = () => {
    setModalVisible(true);
  }
  const cancelCity = () => {
    setModalVisible(false);
  }
  const cancelInfo = () => {
    setModalVisible2(false);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.random(), name:cityName}]);
    setModalVisible(false);
  }

  const GetInfo = (params) => {
    const city = params.city;
    const API_KEY = '232f0df72bf7d42296a4561ce6b3d4be';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const [{ data, loading, error }] = useAxios(
      URL+city+'&appid='+API_KEY+'&units=metric'
    )
    if (loading) return (
      <View>
        <Text>Loading....</Text>
      </View>
    )
    if (error) return (
      <View>
        <Text>Error loading!</Text>
      </View>
    )
    
    setLat(data.coord.lat);
    setLon(data.coord.lon);

    return (
      null
    );
  }

  const showOnMap = () => {
    setStaticdata( [...staticData, { coordinates: {latitude: lat, longitude: lon, name: cityName}}]);
  }
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@savedCities', JSON.stringify(staticData));
    } catch (e) {
      console.log("Cities saving error!");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@savedCities')
      if(value !== null) {
        setStaticdata(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }

  useEffect(() => {
    getData();
  },[]);  
   
  return (
    <SafeAreaProvider>
      <View>
      <Header
      leftComponent={{ icon: "camera" , color: '#FFFF00', onPress: storeData}}
      centerComponent={{ text: 'My Places', style: { color: '#FFFF00' } }}
      rightComponent={{ icon: 'add', color: '', onPress: openDialog }}/>
      </View>
    <Dialog.Container visible={modalVisible}>
    <Dialog.Title>Add a new MyPlace</Dialog.Title>
    <Dialog.Input placeholder="Set city name here" onChangeText={ (text) => setCityName(text)}></Dialog.Input>
    <Dialog.Button label="Cancel" onPress={cancelCity} />
    <Dialog.Button label="Add" onPress={() => addCity()}/>
    </Dialog.Container>
    <Dialog.Container visible={modalVisible2}>
    <Dialog.Title>Information</Dialog.Title>
    <Dialog.Button label="Cancel" onPress={cancelInfo} />
    </Dialog.Container>
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} 
      style={styles.map}
      region={region}
      onRegionChangeComplete={region => setRegion(region)}>
      {staticData.map(item => (
          <Marker title={item.coordinates.name} coordinate={item.coordinates} />
        ))}
    </MapView>
    </View>
    <Button title= "Update your map" onPress={() => showOnMap()}></Button>
    <View>
    <ScrollView style={{margin: 10}}>
      {cities.map(city => (
      <GetInfo key={city.id} city={city.name}/>))}
    </ScrollView>
    </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: 703,
    width: 400,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});