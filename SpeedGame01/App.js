import React, { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Realm from "realm";
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import Dialog from "react-native-dialog";

const App: () => Node = () => {

  const [addDialogVisible, setAddDialogVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [players, setPlayers] = React.useState([]);
  
  //realm
  const Realm = require('realm');

  const Player = {
    name: 'Player',
    properties: {
        name: 'string',
        score: {type: 'int', default: 0},
    },
  };

  const realm = new Realm({schema: [Player]});

  const [timeOne, setTimeOne] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const okClicked = () => {
    setAddDialogVisible(false);
    realm.write(() => {
      const player = realm.create('Player', {
        name: name,
        score: score,
      });
    });
  }

  const circlePressed = () => {
  // get start time - first press
  if (timeOne === 0) {
    const date = new Date();
    setTimeOne(date.getTime());
    setScore(0);
  // second press, calc time and store
  } else {
    const date = new Date();
    setScore(date.getTime() - timeOne);
  } 
}

  const resetTime =  () => {
    setScore(0);
  }

const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'first', title: 'Game' },
  { key: 'second', title: 'Highscores' },
]);

const indexChange = (index) => {
  setIndex(index);

  if (index === 1) {
    // load highscores
    let players = realm.objects('Player').sorted('score');
    let playersArray = Array.from(players);
    setPlayers(playersArray);
  }
}
  
  const layout = useWindowDimensions();

  const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
  <View style={[styles.scene, { backgroundColor: '#fff', marginTop: 90 }]}>
  <Text style={styles.text}>Double tap the circle as fast as you can!</Text>
  <View style={styles.circle} onTouchStart={circlePressed}/>
  <Text style={{paddingTop: 50, textAlign: "center"}}>Time: {score}</Text>
  <View style={styles.row}>
    <View style={styles.button}>
      <View style={{marginRight: 20, width: 150}}>
      <Button title="Add highscores" onPress={() => setAddDialogVisible(true)} />
      </View>
      <View style={{width: 150}}>
      <Button title="Reset time" onPress={() => resetTime()} />
      </View>
    </View>
  </View>
</View>
</View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
  <ScrollView>
      {players.map((player, index) => {
        return (
          <View key={index} style={styles.highscore}>
            <Text style={styles.highscoreName}>{player.name}</Text>
            <Text style={styles.highscoreScore}>{player.score}</Text>
          </View>
        )
      })}
  </ScrollView>
</View></View>
);   

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
}); 

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flex:1}}>
    <Header style={{ backgroundColor: '#2196F3' }}>
  <Left><Icon name='menu' style={{ color: '#fff' }} /></Left>
  <Body>
    <Title>SPEEDGAME</Title>
  </Body>
  <Right/>
  </Header>
  <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={indexChange}
    initialLayout={{ width: layout.width }}
  />
  <Dialog.Container visible={addDialogVisible}>
  <Dialog.Title>Add a new highscore</Dialog.Title>
  <Dialog.Input label="Name" placeholder="Click and type your name here" onChangeText={text => setName(text)}/>
  <Dialog.Button label="Ok" onPress={okClicked} />
  </Dialog.Container>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  banner: {
    marginBottom: 22,
    backgroundColor: "#99BFB3",
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: 'red',
    alignSelf : "center",
    marginTop: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    marginLeft: 34,
    marginTop: 100,
  },
  highscore: {
    flexDirection: 'row',
    margin: 10,
  },
  highscoreName: {
    fontSize: 20,
    color: 'black',
    width: '50%',
    textAlign: 'right',
    marginRight: 5
  },
  highscoreScore: {
    fontSize: 20,
    color: 'gray',
    width: '50%',
    marginLeft: 5
  }
});

export default App;
