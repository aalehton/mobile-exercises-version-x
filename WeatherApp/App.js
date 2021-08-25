import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type {Node} from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { ScrollView, Image, View, TouchableHighlight } from 'react-native';
import Dialog from "react-native-dialog";
import { Header, Card } from 'react-native-elements';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => Node = () => {

  useEffect(() => {
    getData();
  },[]);  

  useEffect(() => {
    storeData();
  },[cities]); 

  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);

  const openDialog = () => {
    setModalVisible(true);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.random(), name:cityName}]);
    setModalVisible(false);
  }

  
  const deleteCity = (deleteCity) => {
  let filteredArray = cities.filter(city => city.name !== deleteCity);
  setCities(filteredArray);

  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log("Cities saving error!");
      alert("Cities saving error");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
      alert("Cities loading error");

    }
  }

  const WeatherForecast = (params) => {
    const city = params.city;
    const API_KEY = '232f0df72bf7d42296a4561ce6b3d4be';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
  
    const [{ data, loading, error }, refetch] = useAxios(
      URL+city+'&appid='+API_KEY+'&units=metric'
    )
    if (loading) return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    )
    if (error) return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    )
    
    const refreshForecast = () => {
      refetch();
    }

    const deleteCity = () => {
      params.deleteCity(city);
    }

    console.log(data);
    let IMAGEPATH = 'http://openweathermap.org/img/wn/';
    let iconCode = data.weather[0].icon;
    let endpath = '@2x.png';
    let imageurl = IMAGEPATH + iconCode + endpath;

    return (
      <Card>
        <Card.Title>{city} {"\n"} {date}.{month}.{year} {hours}:{min}:{sec}</Card.Title>
        <Text>Main: {data.weather[0].main}</Text>
        <View style={{flexDirection: "row"}}>
        <View>
        <Text>Temp: {data.main.temp} °C</Text>
        <Text>Feels: {data.main.feels_like} °C</Text>
        <Text>Min-Max: {data.main.temp_min} °C / {data.main.temp_max} °C </Text>
        </View>
        <Image  source={{uri: imageurl}} style={{aspectRatio:  135 / 76, width: 100, marginLeft: 40}}></Image>
        </View>
        <View style={{width: 200, flexDirection: "row", flex: 1}}>
        <TouchableHighlight onPress={refreshForecast} underlayColor="white">
          <View style={{ marginRight: 150, marginTop: 40}}>
          <Text>Refresh</Text>
          </View>
          </TouchableHighlight>
        <TouchableHighlight onPress={deleteCity} underlayColor="white">
          <View style={{ marginLeft: 80, marginTop: 40}}>
          <Text>Delete</Text>
          </View>
          </TouchableHighlight>
        </View>
      </Card>
    );
  }

  return (
    <SafeAreaProvider>
     <Header
      centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
      rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}/>
      <ScrollView>
        {!modalVisible && cities.map(city => (
        <WeatherForecast key={city.id} city={city.name} deleteCity={deleteCity}/>))}
      </ScrollView>
    <Dialog.Container visible={modalVisible}>
    <Dialog.Title>Add a new city</Dialog.Title>
    <Dialog.Input placeholder="Set city name here" onChangeText={ (text) => setCityName(text)}></Dialog.Input>
    <Dialog.Button label="Cancel" onPress={cancelCity} />
    <Dialog.Button label="Add" onPress={addCity} />
    </Dialog.Container>
    </SafeAreaProvider>
  );
};

export default App;
